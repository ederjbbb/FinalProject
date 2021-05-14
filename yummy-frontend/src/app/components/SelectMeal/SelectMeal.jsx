import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Grid, Typography, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import GenericModal from '../GenericModal';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    borderRadius: '2px'
  },
  quantityBox: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '8px'
  },
  quantity: {
    margin: '13px'
  }
}));

const SelectMeal = ({ isOpen, onClose, item, currentQuantity = 0, setQuantity, quantity }) => {
  const classes = useStyles();

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => setQuantity(quantity >= 1 ? quantity - 1 : 0);

  if (!isOpen) return null;

  return (
    <div className={classes.selectMeal}>
      <GenericModal isOpen={isOpen} onClose={onClose}>
        <img className={classes.image} alt={item.name} src={item.image} />
        <Typography variant="h6">
          {item.name}
        </Typography>
        <Typography>
          {item.description}
        </Typography>

        <div className={classes.quantityBox}>
          <IconButton onClick={decrease} aria-label="remove" className={classes.margin}>
            <RemoveIcon fontSize="large" />
          </IconButton>

          <Typography variant="h6" className={classes.quantity}>
            {quantity}
          </Typography>

          <IconButton onClick={increase} aria-label="add" className={classes.margin}>
            <AddIcon fontSize="large" />
          </IconButton>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => onClose(undefined)}
              fullWidth
              color="secondary">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => onClose(quantity)}
              fullWidth
              disabled={currentQuantity == 0 && quantity == 0}
              color="primary">
              {currentQuantity > 0 && quantity == 0 ? 'Remove' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </GenericModal>
    </div>
  );
}

export default SelectMeal;
