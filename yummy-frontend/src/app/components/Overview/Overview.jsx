import React from 'react';
import { makeStyles, GridList, GridListTile, Grid, Paper, Box, Typography } from '@material-ui/core';
import image from './image.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '2.6vh 8.2vw 4vh'
  },
  item: {
    height: 'max-content'
  }
}));

const Overview = ({ restaurants: data = [] }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h4">
        Loved by you, delivered by us
        </Typography>
      <Grid container className={classes.list} spacing={4} >
        {data.map((item, index) => (
          <Grid className={classes.item} item xs={12} sm={6} md={4} lg={4} xl={4} key={index} m={5} wrap="nowrap">
            <img style={{ width: '100%', height: '70%' }} alt={item.title} src={item.image} />
            <div>
              <Typography variant="h5">
                {item.name}
              </Typography>
              <Typography display="block" variant="body1" color="textSecondary">
                {item.description}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Overview;
