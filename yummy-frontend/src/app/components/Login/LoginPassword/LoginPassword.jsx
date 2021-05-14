import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
  password: {
  //  -webkit-text-security: disc;
    textSecurity: 'disc'
  }
}))

const LoginPassword = (props) => {
  const classes = useStyles();
  const { isBusinessLogin, onPasswordVerification, visible, values, handleChange,
    isInvalidLogin } = props;

  if (!visible) return null;

  return (
    <Fragment>
        <Typography component="h1" variant="h5">
          {isBusinessLogin && 'Business'} Log in
        </Typography>

        <div className={classes.form}>

          {isInvalidLogin &&
            <Alert severity="error">
              Wrong password!
            </Alert>}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange('password')}
            label="Password"
            name="password"
            autoFocus
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={!values.passwordValid}
            color="primary"
            onClick={onPasswordVerification}
          >
            Log in
          </Button>
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="secondary"
            className={classes.submit}
          >
            Forgot password
          </Button>
        </div>
    </Fragment>
  );
}

export default LoginPassword;
