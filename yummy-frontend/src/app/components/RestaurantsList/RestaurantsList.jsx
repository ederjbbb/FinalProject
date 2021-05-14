import React from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: "2vh 0 4vh 0",
  },
  item: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    },
    cursor: 'pointer'
  }
}))

const RestaurantsList = ({ onSelect, restaurants: data =[] }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.box}>
      <Typography gutterBottom variant="h5">
        Choose a restaurant
      </Typography>
      <Grid container className={classes.list} spacing={4} >
        {data.map((item, index) => (
          <Grid className={classes.item} item xs={12} sm={6} md={4} lg={4} xl={4} key={index} m={5} wrap="nowrap">
            <img onClick={() => onSelect(item)} style={{ width: '100%', height: '70%' }} alt={item.name} src={item.image} />
            <div onClick={() => onSelect(item)}>
              <Typography variant="h6">
                {item.name}
              </Typography>
              <Typography display="block" variant="body2" color="textSecondary">
                {item.tags}
              </Typography>
              <Typography display="block" variant="body2" color="textSecondary">
                {item.delivery} delivery
                </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default RestaurantsList;
