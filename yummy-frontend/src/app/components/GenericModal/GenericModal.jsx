import React from 'react';
import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    maxWidth: '40vw',
    padding: theme.spacing(3),

    [theme.breakpoints.down("sm")]: {
      maxWidth: '90vw'
    }
  },
}))

const GenericModal = (props) => {
  const classes = useStyles();
  const { isOpen, onClose, children } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={() => onClose(undefined)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          {children}
        </div>
      </Fade>
    </Modal>
  )
}

export default GenericModal;
