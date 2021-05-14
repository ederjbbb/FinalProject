import React, { useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Grid from '@material-ui/core/Grid';
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';


const Address = ({ onBackToHome, address,  }) => {

  return (
    <Grid xs={12} md={3} lg={6}>
      <Typography>
        Delivery to:
      </Typography>
      <Typography>
        {address}
      </Typography>
      <Link onClick={onBackToHome}>Change</Link>
    </Grid>
  )
}

export default Address;
