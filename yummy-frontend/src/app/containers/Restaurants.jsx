import React, { useState, useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import modules from '../modules';
import Address from '../components/Address';
import Box from '../components/Box';
import RestaurantsList from '../components/RestaurantsList';
import api from '../api'

const Restaurants = ({ pushPage, requestApiCall, address, restaurants, selectRestaurant }) => {
 
  const onSelectRestaurant = (restaurant) => {
    requestApiCall(
      api.callNames.CREATE_ORDER,
      {
        payload: {
          restaurantId: restaurant.id,
          address
        }
      },
      modules.order.actions.CREATE_ORDER
    );
    requestApiCall(
      api.callNames.GET_MEALS,
      {
        restaurantId: restaurant.id
      },
      modules.restaurants.actions.GET_MEALS
    );
    selectRestaurant(restaurant);
    pushPage(`/restaurant/${restaurant.id}`);
  }

  const backToHome = () => {
    pushPage('/');
  }

  return (
    <Box>
      <Address address={address} onBackToHome={backToHome}/>
      <RestaurantsList restaurants={restaurants} onSelect={onSelectRestaurant} />
    </Box>
  )
};

Restaurants.propTypes = {
  pushPage: PropTypes.func.isRequired,
  requestApiCall: PropTypes.func.isRequired,
  selectRestaurant: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  address: modules.order.selectors.getOrderAddress,
  restaurants: modules.restaurants.selectors.getRestaurants
});

const mapDispatchToProps = {
  pushPage: push,
  requestApiCall: modules.connectivity.actions.requestApiCall,
  selectRestaurant: modules.restaurants.actions.selectRestaurant
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurants);
