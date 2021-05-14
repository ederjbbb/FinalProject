import React, { Fragment } from 'react';
import { makeStyles, ListItem, List, ListItemAvatar, Avatar, ListItemText, Grid, Paper, Divider, Button, Typography } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { orderStatus } from '../../util/enums';
import GenericModal from '../GenericModal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { statusToText } from '../../util/generalUtil';
import { ORDER_STATUS } from '../../modules/order/orderConstants';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '70px',
    padding: '0 8.2vw 16px',
    minHeight: '60vh'
  },
  button: {
    minWidth: '100px',
    [theme.breakpoints.up("md")]: {
      margin: '6px 8px 0 0',
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: '8px',
    }
  },
  title: {
    marginBottom: '6px',
  },
  orderDetails: {
    padding: '16px',
    minWidth: '290px'
  },
  orderTitle: {
    paddingBottom: '12px'
  },
  closeButton: {
    marginTop: '12px'
  }
}));

const OrderDetailsModal = (props) => {
  const classes = useStyles();
  const { order, isOpen, onClose } = props;

  if (!isOpen) return null;

  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <div className={classes.orderDetails}>
        <Typography className={classes.orderTitle} variant="h5">
          Order details
        </Typography>
        <Typography>
          Status: {statusToText(order.status)}
        </Typography>
        <OrderDetails order={order}></OrderDetails>
        <Button
          variant="contained"
          size="medium"
          className={classes.closeButton}
          onClick={onClose}
          fullWidth
          color="primary">
          Close
        </Button>
      </div>
    </GenericModal>
  );
}

const OrdersHistoryList = ({ orders, onUpdateStatus, isBusiness, blockUser }) => {
  const classes = useStyles();
  const [selectedOrder, setSelectedOrder] = React.useState(undefined);

  const canBeCanceled = (status) => status == ORDER_STATUS.PLACED;
  const canBeReceived = (status) => [ORDER_STATUS.DELIVERED, ORDER_STATUS.IN_ROUTE].includes(status);


  const canBeProcessed = (status) => status == ORDER_STATUS.PLACED;
  const canBeInRoute = (status) => status == ORDER_STATUS.PROCESSING;
  const canDelivered = (status) => status == ORDER_STATUS.IN_ROUTE;

  const merchantButtons = (status, orderId, userId) => (
    <Fragment>
      <Button variant="contained" onClick={() => blockUser(userId)} className={classes.button} color="primary">
        Block user
      </Button>
      {canBeProcessed(status) &&
        <Button variant="contained" className={classes.button} onClick={() => onUpdateStatus(orderId, ORDER_STATUS.PROCESSING)}>
          Processing
        </Button>}
      {canBeInRoute(status) &&
        <Button variant="contained" className={classes.button} onClick={() => onUpdateStatus(orderId, ORDER_STATUS.IN_ROUTE)}>
          In route
        </Button>}
      {canDelivered(status) &&
        <Button variant="contained" className={classes.button} onClick={() => onUpdateStatus(orderId, ORDER_STATUS.DELIVERED)}>
          Delivered
        </Button>}
    </Fragment>
  );

  const userButtons = (status, orderId) => (
    <Fragment>
      {canBeCanceled(status) &&
        <Button variant="contained" className={classes.button} onClick={() => onUpdateStatus(orderId, ORDER_STATUS.CANCELED)}>
          Cancel
        </Button>}

      {canBeReceived(status) &&
        <Button variant="contained" className={classes.button} onClick={() => onUpdateStatus(orderId, ORDER_STATUS.RECEIVED)}>
          Received
        </Button>}
    </Fragment>
  );

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs>
          <Typography className={classes.title} variant="h5">
            Orders
          </Typography>
          <Paper className={classes.paper}>

            <List className={classes.list} >
                {orders.length == 0 &&
                <Typography>
                  &nbsp;	&nbsp; No orders found.  
                </Typography>}

              {orders.map((order, index) => (
                <Fragment>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={order.restaurant.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={order.restaurant.name}
                      secondary={`Date: ${order.createdAt.toLocaleString()} · Status: ${statusToText(order.status)}`}
                    />
                    <div>
                      {isBusiness && merchantButtons(order.status, order.id, order.user.id)}
                      {!isBusiness && userButtons(order.status, order.id)}
                      <Button variant="contained" onClick={() => setSelectedOrder(order)} className={classes.button} color="primary">
                        Details
                      </Button>
                    </div>
                  </ListItem>
                  {index !== orders.length - 1 && <Divider />}
                </Fragment>
              ))}
            </List>

          </Paper>
        </Grid>
      </Grid>

      <OrderDetailsModal order={selectedOrder} isOpen={selectedOrder != undefined} onClose={() => setSelectedOrder(undefined)} />
    </Fragment>
  );
}

export default OrdersHistoryList;
