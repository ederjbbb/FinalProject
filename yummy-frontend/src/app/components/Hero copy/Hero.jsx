import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: "10px",
    // padding: '30px',
    // backgroundColor: '#fff',
    // position: 'absolute',
    // [theme.breakpoints.up("md")]: {
    //   top: '65%',
    //   left: '25%',
    //   transform: 'translate(-50%, -50%)',
    //   minWidth: '400px',
    // },
    // [theme.breakpoints.down("sm")]: {
    //    top: '55%',
    //    margin: '0',
    //    maxWidth: '350px',
    // }
  },
}))

const Hero = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      
    </div>
  );
}

export default Hero;
