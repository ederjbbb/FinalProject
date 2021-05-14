import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import CloseIcon from '@material-ui/icons/Close';
import Menu from "@material-ui/icons/Menu";
import HeaderLinks from "./HeaderLinks.jsx";
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  header: {
    position: "relative"
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: '15px'
  },
  drawerDivider: {
    margin: '0px 15px 15px 15px'
  },
  drawerLogo: {
    backgroundImage: 'url("yummy_secondary.svg")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    textIndent: '-9999px',
    width: '100px',
  },
  closeIcon: {
    cursor: 'pointer',
    marginTop: '6px',
    color: theme.palette.primary.main
  },
  title: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    textIndent: '-9999px',
    marginLeft: '12px',
    width: '100px',
    backgroundImage: 'url("yummy.svg")'
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    flexWrap: 'nowrap',
    minHeight: '50px',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '15px',
    justifyContent: 'space-between'
  }
}))

const Header = ({user, logout}) => {
  const classes = useStyles();
  const home = user && user.role == 'customer' ? '/' : '/business';
  const [mobileOpen, setMobileOpen] = React.useState(false);
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar >
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button 
            className={classes.title}
            component={Link} 
            to={home} >
            Yummy
          </Button>
        </div>
        <Hidden smDown implementation="js">
          <HeaderLinks user={user} logout={logout}/>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            <div className={classes.drawerHeader}>
              <Button className={classes.drawerLogo}>Yummy</Button>
              <CloseIcon onClick={handleDrawerToggle} className={classes.closeIcon}></CloseIcon>
            </div>
            <Divider className={classes.drawerDivider}/>
            <HeaderLinks onDrawerToggle={handleDrawerToggle} logout={logout} user={user}/>
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

export default Header;
