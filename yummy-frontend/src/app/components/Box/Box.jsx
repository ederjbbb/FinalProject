import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: '4vh',
    padding: '2.6vh 8.2vw 0px'
  },
}))

const Box = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      {props.children}
    </div>
  );
}

export default Box;
