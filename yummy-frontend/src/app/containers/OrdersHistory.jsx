import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import modules from '../modules';
import api from '../api'
import OrdersHistoryList from '../components/OrdersHistoryList';

const OrdersHistory = ({ pushPage, requestApiCall, orders, location }) => {
  const updateStatus = (orderId, status) => {
    requestApiCall(
      api.callNames.UPDATE_ORDER_STATUS,
      {
        orderId,
        status
      },
      modules.order.actions.UPDATE_ORDER_STATUS
    );
  }  
  const blockUser = (userId) => {
    requestApiCall(
      api.callNames.BLOCK_USER,
      {
        userId
      },
      modules.auth.actions.BLOCK_USER
    );
  }

  const isBusiness = location.pathname.includes('/business');

  return (
    <OrdersHistoryList
      blockUser={blockUser}
      orders={orders}
      onUpdateStatus={updateStatus}
      isBusiness={isBusiness}>
    </OrdersHistoryList>
  )
};

OrdersHistory.propTypes = {
  pushPage: PropTypes.func.isRequired,
  requestApiCall: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  orders: modules.order.selectors.getOrders,
});

const mapDispatchToProps = {
  pushPage: push,
  requestApiCall: modules.connectivity.actions.requestApiCall
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersHistory);
