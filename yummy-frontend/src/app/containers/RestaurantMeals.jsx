import React, { useState, useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import modules from '../modules';
import RestaurantMealsBox from '../components/RestaurantMealsBox';
import RestaurantDetails from '../components/RestaurantDetails';
import RestaurantMealsList from '../components/RestaurantMealsList';
import Basket from '../components/Basket';
import api from '../api'

const RestaurantMeals = ({ pushPage, requestApiCall, address, meals, restaurant, order, udpateMeal }) => {
  /**
   * Remove or add a meal to the cart
   */
  const onUpdateMeal = (item, quantity) => {
    requestApiCall(
      api.callNames.UPDATE_MEAL_ORDER,
      {
        payload: {
          mealId: item.id,
          quantity: quantity,
          orderId: order.id
        }
      },
      modules.order.actions.UPDATE_MEAL_ORDER
    );
    udpateMeal({...item, quantity});
  }  

  const checkout = () => {
    requestApiCall(
      api.callNames.UPDATE_ORDER_STATUS,
      {
        orderId: order.id, 
        status: modules.order.constants.ORDER_STATUS.PLACED
      },
      modules.order.actions.CHECKOUT
    );
  }

  const backToHome = () => {
    pushPage('/');
  }

  return (
    <RestaurantMealsBox>
      <RestaurantDetails restaurant={restaurant} address={address} onBackToHome={backToHome}/>
      <RestaurantMealsList order={order} meals={meals} onUpdateMeal={onUpdateMeal} />
      <Basket order={order} onCheckout={checkout} />
    </RestaurantMealsBox>
  )
};

RestaurantMeals.propTypes = {
  pushPage: PropTypes.func.isRequired,
  requestApiCall: PropTypes.func.isRequired,
  udpateMeal: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  address: modules.order.selectors.getOrderAddress,
  meals: modules.restaurants.selectors.getMeals,
  restaurant: modules.restaurants.selectors.getSelectedRestaurant,
  order: modules.order.selectors.getCurrentOrder,
});

const mapDispatchToProps = {
  pushPage: push,
  requestApiCall: modules.connectivity.actions.requestApiCall,
  udpateMeal: modules.order.actions.udpateMeal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantMeals);
