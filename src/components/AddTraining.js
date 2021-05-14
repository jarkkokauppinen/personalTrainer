import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert variant='filled' {...props} />;
}

function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [training, setTraining] = useState({
    date: '',
    duration: '',
    activity: '',
    customer: props.customer,
  });

  const handleClickOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setTraining('');
    setOpen(false);
  }

  const openSnackbar = () => {
    setOpen(false);
    setOpenSnack(true);
  }

  const closeSnackbar = () => {
    setOpenSnack(false);
  }

  const handleSave = () => {
    try {
      const convertDate = new Date(training.date).toISOString();
      const newTraining = ({...training, date: convertDate});
      props.addTraining(newTraining);
      setTraining('');
      setOpen(false);
    }
    catch {
      setTraining('');
      openSnackbar();
    }
  }

  const inputChanged = (event) => {
    setTraining({...training, [event.target.name] : event.target.value});
  }
  
  return (
    <div>
      <Button
        color='primary'
        variant='outlined'
        size='small'
        onClick={handleClickOpen}>
          ADD TRAINING
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label='Activity'
            name='activity'
            value={training.activity}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            label='Date'
            name='date'
            placeholder='year.month.day hours:minutes'
            value={training.date}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            label='Duration'
            name='duration'
            value={training.duration}
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
      <Snackbar
        open={openSnack}
        autoHideDuration={3500}
        onClose={closeSnackbar}>
        <Alert
          style={{position: 'absolute'}}
          severity='error'>
          Invalid date/time value
        </Alert>
      </Snackbar>
    </div>
  );  
}

export default AddTraining;
