import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Alert(props) {
  return <MuiAlert variant='filled' {...props} />;
}

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [openCheck, setOpenCheck] = useState(false);
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const openSnackbar = () => {
    setOpen(true);
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

  const openDeleteCheck = (url) => {
    setCustomerId(url);
    setOpenCheck(true);
  }

  const closeDeleteCheck = () => {
    setOpenCheck(false);
  }

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  }

  const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      body: JSON.stringify(newCustomer),
      headers: { 'Content-type' : 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        setMessage('Customer added successfully');
        openSnackbar();
        fetchCustomers();
      } else {
        alert('Something went wrong.');
      }
    })
    .catch(err => console.error(err))
  }

  const addTraining = (newTraining) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      body: JSON.stringify(newTraining),
      headers: { 'Content-type' : 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        setMessage('Training added successfully');
        openSnackbar();
      } else {
        alert('Something went wrong.');
      }
    })
    .catch(err => console.error(err))
  }

  const editCustomer = (url, updatedCustomer) => {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(updatedCustomer),
      headers: { 'Content-type' : 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        setMessage('Customer edited successfully');
        openSnackbar();
        fetchCustomers();
      } else {
        alert('Something went wrong.');
      }
    })
    .catch(err => console.error(err))
  }

  const deleteCustomer = () => {
    closeDeleteCheck();
    fetch(customerId, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        setMessage('Customer deleted successfully');
        openSnackbar();
        fetchCustomers();
      } else {
        alert('Something went wrong.');
      }
    })
    .catch(err => console.error(err))
  }

  const columns = [
    {
      headerName: 'Customer ID',
      field: 'links.0.href',
      width: 150,
      sortable: true,
      filter: true,
      cellRendererFramework: params =>
        <div>
          Customer {params.value.substr(49, 2)}
        </div>
    },
    {
      headerName: 'First name',
      field: 'firstname',
      width: 130,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Last name',
      field: 'lastname',
      width: 130,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Address',
      field: 'streetaddress',
      width: 160,
      sortable: true,
      filter: true
    },
    {
      field: 'postcode',
      width: 125,
      sortable: true,
      filter: true
    },
    {
      field: 'city',
      width: 110,
      sortable: true,
      filter: true
    },
    {
      field: 'email',
      width: 180,
      sortable: true,
      filter: true
    },
    {
      field: 'phone',
      width: 125,
      sortable: true,
      filter: true
    },
    {
      headerName: '',
      field: 'links.0.href',
      width: 145,
      cellRendererFramework: params =>
        <AddTraining customer={params.value} addTraining={addTraining} />
    },
    {
      headerName: 'Edit',
      field: 'links.0.href',
      width: 85,
      cellRendererFramework: params =>
        <EditCustomer link={params.value} customer={params.data} editCustomer={editCustomer} />
    },
    { 
      headerName: 'Delete',
      field: 'links.0.href',
      width: 85,
      cellRendererFramework: params =>
        <IconButton onClick={() => openDeleteCheck(params.value)}>
          <DeleteIcon />
        </IconButton>,
    }
  ]

  return (
    <div>
      <AddCustomer addCustomer={addCustomer} />
      <Dialog open={openCheck} onClose={closeDeleteCheck}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={closeDeleteCheck} color='primary'>
            Cancel
          </Button>
          <Button onClick={deleteCustomer} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <div className='ag-theme-material' style={{width: '100%', height: 488, margin: 'auto'}}>
        <AgGridReact
          rowData={customers} animateRows='true'
          columnDefs={columns}
          pagination={true}
          paginationPageSize={5}
          suppressCellSelection={true}
        />
        <Snackbar
          open={open}
          autoHideDuration={3500}
          onClose={closeSnackbar}>
          <Alert
            severity='success'>
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Customers;
