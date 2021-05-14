import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
}))

const LoginEmail = (props) => {
  const classes = useStyles();
  const { isBusinessLogin, onEmailVerification, visible, values, handleChange } = props;

  if (!visible) return null;

  return (
    <Fragment>
        <Typography component="h1" variant="h5">
          {isBusinessLogin && 'Business'} Sign up or log in
        </Typography>

        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            value={values.email}
            onChange={handleChange('email')}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={!values.emailValid}
            color="primary"
            onClick={onEmailVerification}
          >
            Continue
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
          <Grid container>
            <Grid item xs />
            <Grid item>
              {isBusinessLogin ? 
              <Link to="/login" variant="body2">
                Not a business account? Click here
              </Link> :
              <Link to="/businessLogin" variant="body2">
                Business account? Click here
              </Link>}
            </Grid>
          </Grid>
        </div>
    </Fragment>
  );
}

export default LoginEmail;
