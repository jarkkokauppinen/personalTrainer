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
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Alert(props) {
  return <MuiAlert variant='filled' {...props} />;
}

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [openCheck, setOpenCheck] = useState(false);
  const [trainingId, setTrainingId] = useState('');

  useEffect(() => {
    fetchTrainings();
  }, []);

  const openSnackbar = () => {
    setOpen(true);
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

  const openDeleteCheck = (id) => {
    setTrainingId(id);
    setOpenCheck(true);
  }

  const closeDeleteCheck = () => {
    setOpenCheck(false);
  }

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  const deleteTraining = () => {
    closeDeleteCheck();
      fetch(`https://customerrest.herokuapp.com/api/trainings/${trainingId}`,
      { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          setMessage('Training deleted successfully');
          openSnackbar();
          fetchTrainings();
        } else {
          alert('Something went wrong.');
        }
      })
      .catch(err => console.error(err))
    }

  const columns = [
    {
      headerName: 'Training ID',
      field: 'id',
      width: 150,
      sortable: true,
      filter: true,
      cellRendererFramework: params =>
        <div>
          Training {params.value}
        </div>
    },
    {
      field: 'date',
      width: 200,
      sortable: true,
      filter: true,
      cellRendererFramework: params =>
        <div>
          {moment(params.value).format('MMMM Do YYYY, h:mm a')}
        </div>
    },
    {
      field: 'duration',
      width: 122,
      sortable: true,
      filter: true
    },
    {
      field: 'activity',
      width: 160,
      sortable: true,
      filter: true
    },
    {
      field: 'customer',
      width: 176,
      sortable: true,
      filter: true,
      cellRendererFramework: params =>
        <div>
          {params.value.firstname} {params.value.lastname}
        </div>
    },
    {
      field: 'delete',
      width: 88,
      cellRendererFramework: params =>
        <IconButton onClick={() => openDeleteCheck(params.data.id)}>
          <DeleteIcon />
        </IconButton>,
    }
  ]

  return (
    <div style={{marginTop: 10}}>
      <Dialog open={openCheck} onClose={closeDeleteCheck}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={closeDeleteCheck} color='primary'>
            Cancel
          </Button>
          <Button onClick={deleteTraining} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <div className='ag-theme-material' style={{width: '70%', height: 488, margin: 'auto'}}>
        <AgGridReact
          rowData={trainings} animateRows='true'
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

export default Trainings;
