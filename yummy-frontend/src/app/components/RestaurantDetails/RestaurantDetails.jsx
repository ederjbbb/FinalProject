import React from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import Address from '../Address';

const RestaurantDetails = ({ address, onBackToHome, restaurant: item = {}, showAddress = true }) => {

  return (
    <Grid item xs={12} wrap="nowrap">

      {showAddress &&
      <Address address={address} onBackToHome={onBackToHome} />}

      <br />
      <Typography gutterBottom variant="h5">
        {item.name}
      </Typography>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4} m={5} wrap="nowrap">
        <img style={{ width: '100%', height: '70%' }} alt={item.title} src={item.image} />
        <div>
          <Typography display="block" variant="body2" color="textSecondary">
            {item.tags}
          </Typography>
          <Typography display="block" variant="body2" color="textSecondary">
            ${item.delivery} delivery
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default RestaurantDetails;
