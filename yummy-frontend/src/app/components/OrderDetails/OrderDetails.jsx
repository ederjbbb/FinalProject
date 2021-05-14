import React, { Fragment } from 'react';
import { makeStyles, Grid, Button, Typography, Divider } from '@material-ui/core';
import { statusToText } from '../../util/generalUtil'; 

const useStyles = makeStyles((theme) => ({
  line: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2px 0'
  },
}))

const OrdersHistoryList = ({history}) => {
  if (!history) return null;

  return (
    <div >
      <Typography variant="h6">
        History
      </Typography>
      {history.map((historyItem, index) => (
        <Typography>
         {`Date: ${historyItem.createdAt.toLocaleString()} · Status: ${statusToText(historyItem.status)}`}
        </Typography>
      ))}
    </div>
  )
} 

const OrderDetails = ({ order = {} }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography>
        Items:
      </Typography>

      {(order.items || []).map((item, index) => (
        <div className={classes.line}>
          <div style={{ display: 'flex' }}>
            <Typography>
              {`${item.quantity}`} &#160;x&#160;
              </Typography>
            <Typography>
              {item.name || item.meal.name}
            </Typography>
          </div>
          <Typography>
            ${item.price || item.total}
          </Typography>
        </div>
      ))}

      {!order.items && 
      <Typography>No items added</Typography>}

      <Divider />

      <div className={classes.line}>
        <Typography>
          Delivery fee
        </Typography>

        <Typography>
          ${order.delivery}
        </Typography>
      </div>
      <Divider />

      <div className={classes.line}>
        <Typography>
          Total
        </Typography>

        <Typography>
          ${order.total}
        </Typography>
      </div>

      <OrdersHistoryList history={order.history} />
    </Fragment>
  );
}

export default OrderDetails;
