import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import axios from "axios";

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';





const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

const CurrentTranslator = () => {

  const [selectedDate, setSelectedDate] = React.useState(new Date('2021-06-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Book this translator
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Book your meeting!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please use the calendar below to book a a meeting with your translator.
          </DialogContentText>
          <form className={classes.form} noValidate>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Book
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
        
//   const clickHandler = async ()=>{
//     await axios.post('http://localhost:5000/api/reservations',{
      
//         //c_id,t_idは上から持ってくる　s_time,d_minuteはここで取得
        
//           "reservation": {
//               "customer_id": "51bbc994-21c9-4151-b4d1-eccf6d3b5f11",
//               "translator_id": "12302b59-6b8e-49bc-a4be-5e1ee173ba4e",
//               "start_time": "today",
//               "duration_minutes": 90,
//               "url": "https://www.testmeeting.com"
//           }
      
    
//     })
//     setCurrentTranslator(null)
//   }

//   return (
//     <div>
//       <div>日付、時間</div>
//       <div>新規予約作成</div>
//       <button onClick={clickHandler}>send</button>
//     </div>
//   );
// }

export default CurrentTranslator;