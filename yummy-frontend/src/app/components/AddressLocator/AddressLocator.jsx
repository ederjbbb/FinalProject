import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './GooglePlaces.css';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: "10px",
    padding: '30px',
    backgroundColor: '#fff',
    position: 'absolute',
    [theme.breakpoints.up("md")]: {
      top: '65%',
      left: '25%',
      transform: 'translate(-50%, -50%)',
      minWidth: '400px',
    },
    [theme.breakpoints.down("sm")]: {
       top: '55%',
       margin: '0',
       maxWidth: '350px',
    }
  },
}))

const AddressLocator = ({onSelect, isUserLogged}) => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      <label>Enter your address to find local restaurants</label>
      <div className={classes.search}>
        <GooglePlacesAutocomplete
          placeholder={'Enter your full address'}
          onSelect={onSelect}
        />
      </div>
      <span>
        {!isUserLogged &&
        <Fragment>
          <Link to={'/login'}>Log in</Link> for you recent addresses.
        </Fragment>}
      </span>
    </div>
  );
}

export default AddressLocator;
