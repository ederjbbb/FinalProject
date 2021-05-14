import Button from "@material-ui/core/Button";
import Hidden from '@material-ui/core/Hidden';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import React from "react";
import { Link } from "react-router-dom";
import CustomDropdown from "../CustomDropdown/CustomDropdown.jsx";
import styles from "./HeaderLinksStyle.js";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function HeaderLinks({ onDrawerToggle, user, logout }) {
  const classes = useStyles();

  const withoutUser = (
    <List className={classes.list}>

      <Hidden smDown implementation="js">
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Partner with us"
            buttonProps={{
              className: classes.navLink,
            }}
            dropdownList={[
              <Link to="/businessLogin" className={classes.dropdownLink}>
                Business Login
              </Link>,
              <Link to="/businessLogin" className={classes.dropdownLink}>
                Create a business account
              </Link>
            ]}
          />
        </ListItem>

        <ListItem className={classes.listItem}>
          <Button
            href=""
            color="primary"
            component={Link}
            to={'/login'}
            className={classes.navLink}
            startIcon={<HomeIcon />}
          >
            <span>Sign up or log in</span>
          </Button>
        </ListItem>
      </Hidden>

      <Hidden mdUp implementation="js">
        <ListItem className={classes.listItem}>
          <Button
            variant="contained"
            component={Link}
            to={'/login'}
            size="medium"

            className={classes.navLinkButton}
            color="primary">
            Sign up or log in
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            component={Link}
            onClick={onDrawerToggle}
            to={'/businessLogin'}
            className={classes.navLink}
            startIcon={<HomeWorkIcon />}
          >
            <span>Business Sign up</span>
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            component={Link}
            onClick={onDrawerToggle}
            to={'/businessLogin'}
            href=""
            className={classes.navLink}
            startIcon={<BusinessIcon />}
          >
            <span>Business Log in</span>
          </Button>
        </ListItem>
      </Hidden>
    </List>
  );

  const withUser = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          component={Typography}
          to={'/'}
          className={classes.navLink}
        >
          <span>Hi {user?.firstName}!</span>
        </Button>
        <Button
          // component/={Typography}
          onClick={logout}
          className={classes.navLink}
        >
          <span>Logout</span>
        </Button>
      </ListItem>
    </List>
  )

  return user ? withUser : withoutUser;
}
