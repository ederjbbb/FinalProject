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
  save: {
    marginTop: theme.spacing(1),
  }
}))

const LoginPhone = (props) => {
  const classes = useStyles();
  const { isBusinessLogin, visible, values, handleChange, onSaveDetails } = props;

  if (!visible) return null;

  const isFormValid = values.firstNameValid && values.lastNameValid && values.passwordValid;

  return (
    <Fragment>
      <Typography component="h1" variant="h5">
        {isBusinessLogin && 'Business'} Sign up
      </Typography>

      <div className={classes.form}>
        <Typography>
          You are almost there.
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={6} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              value={values.firstName}
              onChange={handleChange('firstName')}
              label="First name"
              name="firstName"
              autoFocus
            />
          </Grid>
          <Grid item xs={6} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              value={values.lastName}
              onChange={handleChange('lastName')}
              label="Last name"
              name="lastName"
            />
          </Grid>
        </Grid>

        <TextField
          variant="outlined"
          required
          fullWidth
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange('password')}
          label="Password"
          name="password"
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={!isFormValid}
          color="primary"
          className={classes.save}
          onClick={onSaveDetails}
        >
          Finish
        </Button>
      </div>

    </Fragment>
  );
}

export default LoginPhone;
