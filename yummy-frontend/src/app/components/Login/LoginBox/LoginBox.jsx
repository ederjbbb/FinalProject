import React from 'react';
import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  login: {
    marginTop: '50px',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  }
}))

const Hero = ({children}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.login}>
      <CssBaseline />
      <div className={classes.paper}>
        {children}
      </div>
    </Container>
  );
}

export default Hero;
