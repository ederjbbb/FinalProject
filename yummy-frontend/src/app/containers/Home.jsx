import React, { useState, useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import api from '../api';
import modules from '../modules';
import Hero from '../components/Hero';
import Overview from '../components/Overview';

const Home = ({ pushPage, requestApiCall, addAddress, isUserLogged, restaurants }) => {

  const selectAddress = address => {
    if (!isUserLogged)
      alert('Please log in to access the restaurants list.');
    addAddress(address.description, isUserLogged);
    pushPage('/restaurants');
  }

  return (
    <div>
      <Hero onSelect={selectAddress} isUserLogged={isUserLogged} />
      <Overview restaurants={restaurants.slice(0, 6)}/>
    </div>
  )
};

Home.propTypes = {
  pushPage: PropTypes.func.isRequired,
  requestApiCall: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  isUserLogged: modules.auth.selectors.getIsUserLogged,
  restaurants: modules.restaurants.selectors.getHomeRestaurants
});

const mapDispatchToProps = {
  pushPage: push,
  requestApiCall: modules.connectivity.actions.requestApiCall,
  addAddress: modules.order.actions.addAddress,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
