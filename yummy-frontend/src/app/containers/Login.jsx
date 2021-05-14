import React, { Fragment, useState, useCallback } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import LoginBox from '../components/Login/LoginBox';
import LoginEmail from '../components/Login/LoginEmail';
import LoginPhone from '../components/Login/LoginPhone';
import LoginDetails from '../components/Login/LoginDetails';
import LoginPassword from '../components/Login/LoginPassword';
import modules from '../modules';
import api from '../api'

const Login = (props) => {
  const [isWaitingSMS, setIsWaitingSMS] = useState(false);
  const { pushPage, requestApiCall, currentAuthStep, isInvalidLogin, isInvalidCode } = props;
  const isBusinessLogin = props.location.pathname == '/businessLogin';

  const [values, setValues] = useState({
    email: '', emailValid: false,
    phone: '', phoneValid: false,
    firstName: '', firstNameValid: false,
    lastName: '', lastNameValid: false,
    code: '', codeValid: false,
    password: '', passwordValid: false
  });

  const emailVerification = () => {
    requestApiCall(
      api.callNames.GET_USER_BY_EMAIL,
      {
        email: values.email
      },
      modules.auth.actions.GET_USER_BY_EMAIL
    );
  }

  const phoneVerification = () => {
    requestApiCall(
      api.callNames.VALIDATE_SMS,
      {
        payload: {
          phone: values.phone,
          code: values.code
        }
      },
      modules.auth.actions.VALIDATE_SMS
    );
  }

  const sendSMS = () => {
    requestApiCall(
      api.callNames.SEND_SMS,
      {
        phone: values.phone
      },
      modules.auth.actions.SEND_SMS
    );
    setIsWaitingSMS(true);
  }

  const saveUserDetails = () => {
    requestApiCall(
      api.callNames.ADD_USER,
      {
        payload: {
          ...values,
          role: isBusinessLogin ? 'merchant' : 'customer'
        }
      },
      modules.auth.actions.ADD_USER
    );
  }

  const passwordVerification = () => {
    requestApiCall(
      api.callNames.LOGIN,
      {
        payload: {
          email: values.email,
          password: values.password
        }
      },
      modules.auth.actions.LOGIN
    );
  }

  const validateEmail = email => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  const handleChange = useCallback((prop) => (event) => {
    const isValid = prop != 'email' ? event.target.value != '' : validateEmail(event.target.value);
    setValues({ ...values, [prop]: event.target.value, [`${prop}Valid`]: isValid });
  }, [setValues, values])

  return (
    <LoginBox>
      <LoginEmail
        {...props}
        isBusinessLogin={isBusinessLogin}
        visible={currentAuthStep == modules.auth.constants.AUTH_STEPS.EMAIL}
        handleChange={handleChange}
        values={values}
        onEmailVerification={emailVerification} />
        
      <LoginPhone 
        {...props} 
        isInvalidCode={isInvalidCode}
        isBusinessLogin={isBusinessLogin}
        visible={currentAuthStep == modules.auth.constants.AUTH_STEPS.PHONE}
        handleChange={handleChange}
        values={values}
        isWaitingSMS={isWaitingSMS} 
        onPhoneVerification={phoneVerification} 
        onSendSMS={sendSMS} />

      <LoginDetails 
        {...props} 
        isBusinessLogin={isBusinessLogin}
        visible={currentAuthStep == modules.auth.constants.AUTH_STEPS.USER_DETAILS}
        handleChange={handleChange}
        values={values}
        onSaveDetails={saveUserDetails} /> 

      <LoginPassword
        {...props}
        isBusinessLogin={isBusinessLogin}
        visible={currentAuthStep == modules.auth.constants.AUTH_STEPS.PASSWORD}
        handleChange={handleChange}
        values={values}
        isInvalidLogin={isInvalidLogin}
        onPasswordVerification={passwordVerification} />
    </LoginBox>
  )
};

const mapStateToProps = createStructuredSelector({
  currentAuthStep: modules.auth.selectors.getCurrentAuthStep,
  isInvalidLogin: modules.auth.selectors.getIsInvalidLogin,
  isInvalidCode: modules.auth.selectors.getIsInvalidCode,
});

const mapDispatchToProps = {
  pushPage: push,
  requestApiCall: modules.connectivity.actions.requestApiCall
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

