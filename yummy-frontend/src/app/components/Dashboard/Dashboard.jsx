import React, { Fragment } from 'react';
import { Button, makeStyles, Grid, Typography, Paper, ListItem, ListItemAvatar, ListItemText, List, Avatar, Divider, Input, TextField } from '@material-ui/core';
import GenericModal from '../GenericModal';

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: '16px 0 16px'
  },
  dashboard: {
    minWidth: '83vw'
  },
  ordersButton: {
    marginRight: '8px'
  },
  button: {
    minWidth: '100px',
    [theme.breakpoints.up("md")]: {
      margin: '6px 8px 0 0',
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: '8px',
    }
  },
  modalButtons: {
    margin: '16px 8px 0px 0'
  },
  modalInputs: {
    display: 'flex',
    flexDirection: 'column'
  }
}))


const EditModal = (props) => {
  const classes = useStyles();
  const { values, isOpen, onClose, handleChange, onSave, onDelete } = props;

  if (!isOpen) return null;

  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <div className={classes.details}>
        <div classname={classes.modalInputs}>
          <TextField fullWidth label='Name' value={values.name} onChange={handleChange('name')} />

          <TextField fullWidth label='Description' value={values.description} onChange={handleChange('description')} />

          <TextField fullWidth label='Image URL' value={values.image} onChange={handleChange('image')} />

          <TextField fullWidth label='Delivery Fee' value={values.delivery} onChange={handleChange('delivery')} />

          <TextField fullWidth label='Tags (comma separed)' value={values.tags} onChange={handleChange('tags')} />
        </div>
        <Grid container className={classes.modalButtons}>
          <Grid item>
            <Button
              variant="contained"
              size="medium"
              className={classes.closeButton}
              onClick={onClose}
              fullWidth
              color="secondary">
              Close
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="medium"
              className={classes.saveButton}
              onClick={onSave}
              fullWidth
              color="primary">
              Save
           </Button>
          </Grid>
        </Grid>

      </div>
    </GenericModal>
  );
}

const Dashboard = ({ restaurants = [], openEditModal, goToOrders, goToRestaurantMeals, isEdit, onDelete, values, onHandleChange, closeEditModal, saveRestaurant }) => {
  const classes = useStyles();

  return (
    <div className={classes.dashboard}>

      <Typography className={classes.title} variant="h4">
        Restaurants
      </Typography>
      
      <Button
        className={classes.ordersButton}
        variant="contained"
        size="large"
        color="primary"
        onClick={goToOrders}
      >
        Customers orders
      </Button>

      <Button
        className={classes.addButton}
        variant="contained"
        size="large"
        color="primary"
        onClick={() => openEditModal(undefined)}
      >
        Create new restaurant
      </Button>

      <Fragment>
        <Grid container className={classes.root}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <List className={classes.list} >
                {restaurants.length == 0 &&
                  <Typography>
                    &nbsp;	&nbsp; No restaurants found.  
                  </Typography>}

                {restaurants.map((restaurant, index) => (
                  <Fragment>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={restaurant.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={restaurant.name}
                      />
                      <div>
                        <Button variant="contained" onClick={() => openEditModal(restaurant)} className={classes.button} color="primary">
                          Edit
                        </Button>
                        <Button variant="contained" onClick={() => goToRestaurantMeals(restaurant)} className={classes.button} color="primary">
                          Meals
                        </Button>
                        <Button variant="contained" onClick={() => onDelete(restaurant)} className={classes.button} color="primary">
                          Delete
                        </Button>
                      </div>
                    </ListItem>
                    {index !== restaurants.length - 1 && <Divider />}
                  </Fragment>
                ))}
              </List>

            </Paper>
          </Grid>
        </Grid>

        <EditModal
          isOpen={isEdit}
          values={values}
          onClose={closeEditModal}
          handleChange={onHandleChange}
          onSave={saveRestaurant}
        ></EditModal>

      </Fragment>
    </div>
  );
}

export default Dashboard;
