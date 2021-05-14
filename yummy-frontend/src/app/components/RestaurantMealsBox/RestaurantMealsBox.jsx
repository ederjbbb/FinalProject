import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: '4vh',
    padding: '2.6vh 8.2vw 16px'
  },
}))

const RestaurantMealsBox = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.box} spacing={4}>
      {props.children}
    </Grid>
  );
}

export default RestaurantMealsBox;
