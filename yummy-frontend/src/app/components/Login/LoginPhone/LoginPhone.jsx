import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  verify: {
    paddingRight: theme.spacing(1)
  },
}))

const LoginPhone = (props) => {
  const classes = useStyles();
  const { isWaitingSMS, onPhoneVerification, onSendSMS, phoneNumber, visible, values, handleChange, isInvalidCode } = props;

  if (!visible) return null;

  const askPhoneForm = (
    <div className={classes.form}>
      <Typography>
        We need to send a 6-digit code to your phone to help us keep your account safe.
      </Typography>

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        value={values.phone}
        onChange={handleChange('phone')}
        id="phone"
        label="Phone number"
        name="phone"
        autoComplete="phone"
        autoFocus
      />
      <Button
        fullWidth
        variant="contained"
        size="large"
        disabled={!values.phoneValid}
        color="primary"
        onClick={onSendSMS}
      >
        Continue
      </Button>
    </div>
  )

  const validatePhoneForm = (
    <div className={classes.form}>
      <Typography>
        Please confirm the 6-digit code sent to {values.phone}.
      </Typography>

      {isInvalidCode &&
        <Alert severity="error">
          Code invalid!
        </Alert>}

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="code"
        value={values.code}
        onChange={handleChange('code')}
        label="SMS Code"
        name="code"
        autoFocus
      />
      <Grid container>
        <Grid item xs className={classes.verify}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={!values.codeValid}
            color="primary"
            onClick={onPhoneVerification}
          >
            Verify
            </Button>
        </Grid>
        <Grid item >
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={onSendSMS}
          >
            Resend
            </Button>
        </Grid>
      </Grid>

    </div>
  )

  return (
    <Fragment>
      <Typography component="h1" variant="h6">
        Verify phone number
        </Typography>

      {!isWaitingSMS && askPhoneForm}
      {isWaitingSMS && validatePhoneForm}
    </Fragment>
  );
}

export default LoginPhone;
