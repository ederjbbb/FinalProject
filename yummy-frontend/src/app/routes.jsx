import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import modules from './modules';
import api from './api';
import Home from './containers/Home';
import Login from './containers/Login';
import Restaurants from './containers/Restaurants';
import RestaurantMeals from './containers/RestaurantMeals';
import OrdersHistory from './containers/OrdersHistory';
import BusinessDashboard from './containers/BusinessDashboard';
import BusinessMeals from './containers/BusinessMeals';
import Header from './components/Header';
import Footer from './components/Footer';

const Routes = ({ location, user, requestApiCall }) => {
  const logout = () => {
    requestApiCall(
      api.callNames.LOGOUT,
      {},
      modules.auth.actions.LOGOUT
    );
  }

  return (
      <Fragment>
        <Header user={user} logout={logout}/>

        <div id="container">
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/businessLogin" component={Login} />

            <Route exact path="/restaurants" component={Restaurants} />
            <Route exact path="/orders" component={OrdersHistory} />
            <Route path="/restaurant/:restaurantCode" component={RestaurantMeals} />

            <Route exact path="/business/" component={BusinessDashboard} />
            <Route exact path="/business/meals" component={BusinessMeals} />
            <Route exact path="/business/orders" component={OrdersHistory} />
          </Switch>
        </div>

        <Footer />
      </Fragment>
    )
}

Routes.propTypes = {
  location: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  location: modules.router.selectors.getLocation,
  user: modules.auth.selectors.getUser
});

const mapDispatchToProps = {
  requestApiCall: modules.connectivity.actions.requestApiCall
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
