import React, { useState } from "react";
//materialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
require('dotenv').config();

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
});
export const auth = firebase.auth();
const firestore = firebase.firestore();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Relayte
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://i.ibb.co/5kbP9vn/relate.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({ setLogin, setIsCustomer }) {
  
  const [user] = useAuthState(auth);
  const [testProvider, setTestProvider] = useState(1);

  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      setTestProvider(provider)
      auth.signInWithPopup(provider);
      //setIsCustomer(true)
      setLogin(true)
    }
    console.log("Sign in")
    console.log(testProvider)
    return(
      <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      onClick={signInWithGoogle}
    >
      Sign In with Google
    </Button>
      );
    }
    console.log(user)

  const [val, setVal] = React.useState('true');

  const classes = useStyles();

  const handleChange = e => {
    setVal(e.target.value);
    e.target.value === "true" ? setIsCustomer(true) : setIsCustomer(false)
  }

  const clickHandler = ()=>{
    setLogin(true)
  }

  const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Grid spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  >
           <FormControlLabel control={ <Radio
                  checked={val === 'true'}
                  onChange={handleChange}
                  value="true"
                  name="radio-button-demo"
                  // inputProps={{ 'aria-label': 'A' }}
                  />} label="Customer" />
                  
                  <FormControlLabel control={ 
                     <Radio
                  checked={val === 'false'}
                  onChange={handleChange}
                  value="false"
                  name="radio-button-demo"
                  // inputProps={{ 'aria-label': 'A' }} 
                  />} label="Translator" />    
            </Grid>
          <SignIn/>
            <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

//   return (
//     <div>
      

//       <label>
//         <input
//           type="radio"
//           value="true"
//           onChange={handleChange}
//           checked={val === 'true'}
//         />
//         Customer
//       </label>
//       <label>
//         <input
//           type="radio"
//           value="false"
//           onChange={handleChange}
//           checked={val === 'false'}
//         />
//         Translator
//       </label>
//       <p></p>
//       <button 
//       onClick={clickHandler}>Login</button>
//     </div>
//   );
// }

export default Login;