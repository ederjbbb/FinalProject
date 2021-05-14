import React, { Fragment } from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import SelectMeal from '../SelectMeal';

const useStyles = makeStyles((theme) => ({
  item: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    },
    cursor: 'pointer',
    border: '1px solid transparent',
    borderRadius: '2px',
    backgroundColor: 'white',
    marginTop: '8px'
  },
  innerItem: {
  },
  groupList: {
    padding: '0 8px 16px 0'
  },
  groupTitle: {
    paddingBottom: '16px'
  },
  itemDescription: {
    paddingBottom: '8px'
  },
  image: {
    width: '100%',
    height: '60%',
    marginTop: '10px',
    marginLeft: '10px',
    borderRadius: '2px'
  }
}))

const RestaurantMealsList = ({ onUpdateMeal, meals = [], order }) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();
  const [currentQuantity, setCurrentQuantity] = React.useState();
  const [quantity, setQuantity] = React.useState(0);

  const select = (item) => {
    setSelectedItem(item);
    const meal = (order.items||[]).find(m => m.id == item.id) || {quantity: 0};
    setQuantity(meal.quantity);
    setCurrentQuantity(meal.quantity);
    setIsOpen(true);
  }

  const closeSelectMeal = (quantity) => {
    if (quantity != undefined)
      onUpdateMeal(selectedItem, quantity);
    setIsOpen(false);
  }

  const data = [
    {
      groupName: 'Meals',
      meals
    }
  ];

  const Meal = (item) => (
    <div onClick={() => select(item)} >
      <Grid container className={classes.innerItem}>
        <Grid item xs={8} wrap="nowrap">
          <Typography variant="h6">
            {item.name}
          </Typography>
          <Typography className={classes.itemDescription} display="block" variant="body2" color="textSecondary">
            {item.description.length > 10 ?
              item.description.substring(0, item.description.lastIndexOf(' ', 140)) + '...' :
              item.description}
          </Typography>
          <Typography display="block" fontWeight={500} variant="body2" color="textSecondary">
            ${item.price}
          </Typography>
        </Grid>
        <Grid item xs={4} wrap="nowrap">
          <img className={classes.image} alt={item.name} src={item.image} />
        </Grid>
      </Grid>
    </div>
  )

  return (
    <Fragment>
      <SelectMeal
        isOpen={isOpen}
        onClose={closeSelectMeal}
        item={selectedItem}
        quantity={quantity} 
        setQuantity={setQuantity}
        currentQuantity={currentQuantity} >
      </SelectMeal>

      <Grid className={classes.mealsList} item xs={12} sm={8} m={5} wrap="nowrap">
        {data.map((group, index) => (
          <div>
            <Typography className={classes.groupTitle} variant="h5">
              {group.groupName}
            </Typography>

            <Grid container className={classes.groupList} spacing={4}>
              {group.meals.map((item, index) => (
                <Grid className={classes.item} item xs={12} sm={6} key={index} m={5} wrap="nowrap">
                  {Meal(item)}
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </Grid>
    </Fragment>
  );
}

export default RestaurantMealsList;
