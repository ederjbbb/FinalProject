import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AddressLocator from '../AddressLocator';
import { makeStyles } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles((theme) => ({
  hero: {
    background: 'url(https://brasil.cambly.com/wp-content/uploads/2019/03/shutterstock_795671512.jpg)',
    height: '50vh',
    marginTop: '50px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    [theme.breakpoints.down("sm")]: {
      justifyContent: 'center',
      display: 'flex',
    }
  },
  strong: {
    [theme.breakpoints.down("sm")]: { 
      display: 'block',
    },
  },
  message: {
    position: 'absolute',
    top: '24%',
    fontWeight: '500',
    fontSize: '37px',
    maxWidth: '400px',
    color: '#fff',
    [theme.breakpoints.up("md")]: {
      left: '25%',
      transform: 'translate(-50%, -50%)',
    },
    [theme.breakpoints.down("sm")]: { 
      textAlign: 'center',
      top: '2%',
    }
  }
}));

const Hero = ({onSelect, isUserLogged}) => {
  const classes = useStyles()
  const current = Math.round(Math.random() * 5);

  return (
    <div className={classes.hero}>
      <div className={classes.message}> 
        <span>Your favourite </span>
        { current == 0 && <Grow in={current == 0}>
          <strong className={classes.strong}>chinese</strong>
        </Grow> }
        { current == 1 && <Grow in={current == 1}>
          <strong className={classes.strong}>brazilian</strong>
        </Grow> }
        { current == 2 && <Grow in={current == 2}>
          <strong className={classes.strong}>brazilian</strong>
        </Grow>}
        { current == 3 && <Grow in={current == 3}>
          <strong className={classes.strong}>american</strong>
        </Grow>}
        { current == 4 && <Grow in={current == 4}>
          <strong className={classes.strong}>home made</strong>
        </Grow>}
        { current == 5 && <Grow in={current == 5}>
          <strong className={classes.strong}>italian</strong>
        </Grow>}
        <span> food, delivered to your door</span>
      </div>
      <AddressLocator className={classes.address} onSelect={onSelect} isUserLogged={isUserLogged}/>
    </div>
  )
}

export default Hero;
