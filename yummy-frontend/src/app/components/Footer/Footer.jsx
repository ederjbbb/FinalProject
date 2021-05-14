import React from 'react';
import { makeStyles, Grid, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: '2.6vh 8.2vw 0px',
    bottom: '0',
    backgroundColor: '#2e3333',
    [theme.breakpoints.up("md")]: {
      height: '290px'
    }
  },
  item: {
    background: 'hsla(0,0%,100%,.1)',
    marginBottom: '2.6vh',
    padding: '20px',
    minHeight: '200px',
    [theme.breakpoints.down("sm")]: { 
      marginBottom: '0',
    }
  },
  title: {
    paddingBottom: '6px'
  },
  link: {
    paddingBottom: '2px',
    cursor: 'pointer'
  },
  copyright: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    color: '#828585',
    [theme.breakpoints.down("sm")]: { 
      padding: '16px 0'
    }
  }
}))

const Footer = (props) => {
  const classes = useStyles();

  const Box = (key, data) => (
    <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={key} m={5} wrap="nowrap">
      <div className={classes.item} >
        <Typography className={classes.title} variant="h6" color="secondary">
          {data.title}
        </Typography>
        {data.links.map((link, index) => (
          <Link className={classes.link} to={link.to} component={Link} color="secondary" display="block" >
            {link.description}
          </Link>
        ))} 
      </div>
    </Grid>
  )

  // Cound be moved to backend
  const data = [
    {
      title: 'Discover Yummy',
      links: [
        {
          description: 'About us',
          to: '/'
        },
        {
          description: 'Newsroom',
          to: '/'
        },
        {
          description: 'Engineering blog',
          to: '/'
        },
        {
          description: 'Design blog',
          to: '/'
        },
        {
          description: 'Carrers',
          to: '/'
        }
      ]
    },
    {
      title: 'Legal',
      links: [
        {
          description: 'Terms and conditions',
          to: '/'
        },
        {
          description: 'Privacy',
          to: '/'
        },
        {
          description: 'Cookies',
          to: '/'
        }
      ]
    },
    {
      title: 'Help',
      links: [
        {
          description: 'Contact',
          to: '/'
        },
        {
          description: 'FAQs',
          to: '/'
        },
        {
          description: 'Cuisines',
          to: '/'
        },
        {
          description: 'Sitem ap',
          to: '/'
        }
      ]
    },
    {
      title: 'Yummy with you',
      links: [
        {
          description: 'Apple Store',
          to: '/'
        },
        {
          description: 'Play Store',
          to: '/'
        }
      ]
    }
  ];

  const year = new Date().getFullYear();

  return (
    <div className={classes.footer}>
      <Grid container className={classes.list} spacing={2} >
        {data.map(((item, index) => (
          Box(index, item)
        )))}
      </Grid>
      <div className={classes.copyright}>
        <Typography>
          © {year} Yummy
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
