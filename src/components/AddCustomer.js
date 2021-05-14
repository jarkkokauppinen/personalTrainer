import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setCustomer('');
    setOpen(false);
  }

  const handleSave = () => {
    props.addCustomer(customer);
    setCustomer('');
    setOpen(false);
  }

  const inputChanged = (event) => {
      setCustomer({...customer, [event.target.name] : event.target.value});
  }
  
  return (
    <div>
      <Button
        style={{marginTop: 15}}
        color='primary'
        variant='outlined'
        onClick={handleClickOpen}>
          ADD NEW CUSTOMER
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label='First name'
            name='firstname'
            value={customer.firstname}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            label='Last name'
            name='lastname'
            value={customer.lastname}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            label='Address'
            name='streetaddress'
            value={customer.streetaddress}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            label='Postcode'
            name='postcode'
            value={customer.postcode}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            label='City'
            name='city'
            value={customer.city}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            label='Email'
            name='email'
            value={customer.email}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            label='Phone'
            name='phone'
            value={customer.phone}
            onChange={inputChanged}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );  
}

export default AddCustomer;
