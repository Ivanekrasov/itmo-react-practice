import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { bool, func, string, number } from 'prop-types';

import './imageDialog.scss';

const ImageDialog = props => {
  const { open, onClose, image, imageName } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{imageName}</DialogTitle>
      <DialogContent>
        <img className="nasa-image" src={image} alt="Nasa photo" />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ImageDialog.propTypes = {
  open: bool,
  onClose: func,
  image: string,
  imageName: number,
};

export default ImageDialog;
