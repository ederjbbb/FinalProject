import React from 'react';
import { makeStyles, Grid, Button, Typography, Divider } from '@material-ui/core';
import OrderDetails from '../OrderDetails/OrderDetails';

const useStyles = makeStyles((theme) => ({
  basket: {
    backgroundColor: 'white',
    marginBottom: '16px'
  },
  checkout: {
    marginBottom: '10px'
  }
}))

const Basket = ({ onCheckout, order }) => {
  const classes = useStyles();
  const disabled = (order?.items || []).length == 0;

  return (
    <Grid className={classes.basket} item xs={12} sm={4} m={5} wrap="nowrap">
      <div>
        <Button
          variant="contained"
          size="medium"
          onClick={onCheckout}
          disabled={disabled}
          fullWidth
          className={classes.checkout}
          color="primary">
          Checkout
        </Button>

        <OrderDetails order={order} />
      </div>
    </Grid>
  );
}

export default Basket;
