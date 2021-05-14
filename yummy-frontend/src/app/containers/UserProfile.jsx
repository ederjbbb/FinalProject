import React, { useState, useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import modules from '../modules';

const UserProfile = ({ pushPage, requestApiCall }) => {
  const save = () => {
    alert('Saved with success!');
  }

  return null;
//   return (
//     <UserProfileForm 
//         onSave={save} />
//   )
};

UserProfile.propTypes = {
  pushPage: PropTypes.func.isRequired,
  requestApiCall: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = {
  pushPage: push,
  requestApiCall: modules.connectivity.actions.requestApiCall
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
