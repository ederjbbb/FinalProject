import React, { useState, useRef, useEffect, Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import modules from '../modules';
import BusinessRestaurantMeals from '../components/BusinessRestaurantMeals';
import { selectRestaurant } from '../modules/restaurants/restaurantsActions';
import Box from '../components/Box';
import api from '../api'

const BusinessMeal = ({ pushPage, requestApiCall, meals, selectedRestaurant }) => {
  const [isEdit, setIsEdit] = useState(false);

  const [values, setValues] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    restaurantId: '',
    id: ''
  })

  const handleChange = useCallback((prop) => (event) => {
    const isValid = event.target.value != '';
    setValues({ ...values, [prop]: event.target.value, [`${prop}Valid`]: isValid });
  }, [setValues, values])

  const onDelete = (meal) => {
    requestApiCall(
      api.callNames.DELETE_MEAL,
      {
        mealId: meal.id
      },
      modules.business.actions.DELETE_MEAL
    );
  }

  const openEditModal = (meal) => {
    const restaurantId = selectedRestaurant.id;
    if (meal)
      setValues({ ...meal, restaurantId })
    else
      setValues({ restaurantId })
    setIsEdit(true);
  }

  const saveMeal = () => {
    if (values.id) {
      requestApiCall(
        api.callNames.UPDATE_MEAL,
        {
          payload: values
        },
        modules.business.actions.UPDATE_MEAL
      );
    } else {
      requestApiCall(
        api.callNames.ADD_MEAL,
        {
          payload: values
        },
        modules.business.actions.ADD_MEAL
      );
    }
    closeEditModal();
  }

  const closeEditModal = () => {
    setIsEdit(false);
  }

  return (
    <Box>
      <BusinessRestaurantMeals
        meals={meals}
        restaurant={selectedRestaurant}
        saveMeal={saveMeal}
        values={values}
        isEdit={isEdit}
        onHandleChange={handleChange}
        openEditModal={openEditModal}
        onDelete={onDelete}
        closeEditModal={closeEditModal}
      >
      </BusinessRestaurantMeals>
    </Box>
  );
};

BusinessMeal.propTypes = {
  pushPage: PropTypes.func.isRequired,
  requestApiCall: PropTypes.func.isRequired,
  selectRestaurant: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  restaurants: modules.business.selectors.getRestaurants,
  selectedRestaurant: modules.business.selectors.getSelectedRestaurant,
  meals: modules.business.selectors.getMeals
});

const mapDispatchToProps = {
  pushPage: push,
  requestApiCall: modules.connectivity.actions.requestApiCall,
  selectRestaurant: modules.business.actions.selectRestaurant
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessMeal);
