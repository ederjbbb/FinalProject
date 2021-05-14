import React, { useState, useRef, useEffect, Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import modules from '../modules';
import Dashboard from '../components/Dashboard';
import { selectRestaurant } from '../modules/restaurants/restaurantsActions';
import Box from '../components/Box';
import api from '../api'

const BusinessDashboard = ({ pushPage, requestApiCall, restaurants, selectRestaurant }) => {
  const [isEdit, setIsEdit] = useState(false);

  const [values, setValues] = useState({
    name: '',
    description: '', 
    image: '',
    delivery: '',
    tags: '',
    userId: '',
    id: ''
  })

  const handleChange = useCallback((prop) => (event) => {
    const isValid = event.target.value != '';
    setValues({ ...values, [prop]: event.target.value, [`${prop}Valid`]: isValid });
  }, [setValues, values])

  const goToOrders = () => {
    pushPage('/business/orders');
  }

  const saveRestaurant = () => {
    if (values.id) {
      requestApiCall(
        api.callNames.UPDATE_RESTAURANT,
        {
          payload: values
        },
        modules.business.actions.UPDATE_RESTAURANT
      );
    } else {
      requestApiCall(
        api.callNames.ADD_RESTAURANT,
        {
          payload: values
        },
        modules.business.actions.ADD_RESTAURANT
      );
    }
    closeEditModal();
  }

  const onDelete = (restaurant) => {
    requestApiCall(
      api.callNames.DELETE_RESTAURANT,
      {
        restaurantId: restaurant.id
      },
      modules.business.actions.DELETE_RESTAURANT
    );
  }

  const goToRestaurantMeals = (restaurant) => {
    selectRestaurant(restaurant);
    pushPage('/business/meals');
  }

  const openEditModal = (restaurant) => {
    if (restaurant)
      setValues({...restaurant})
    else 
      setValues({})
    setIsEdit(true);
  } 

  const closeEditModal = () => {
    setIsEdit(false);
  } 

  return (
    <Box>
      <Dashboard 
        goToOrders={goToOrders}
        restaurants={restaurants}
        saveRestaurant={saveRestaurant}
        goToRestaurantMeals={goToRestaurantMeals}
        values={values}
        isEdit={isEdit}
        onHandleChange={handleChange}
        openEditModal={openEditModal}
        onDelete={onDelete}
        closeEditModal={closeEditModal}
        >
      </Dashboard>
    </Box>
  );
};

BusinessDashboard.propTypes = {
  pushPage: PropTypes.func.isRequired,
  requestApiCall: PropTypes.func.isRequired,
  selectRestaurant: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  restaurants: modules.business.selectors.getRestaurants,
  selectedRestaurant: modules.business.selectors.getSelectedRestaurant
});

const mapDispatchToProps = {
  pushPage: push,
  requestApiCall: modules.connectivity.actions.requestApiCall,
  selectRestaurant: modules.business.actions.selectRestaurant
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessDashboard);
