import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { bool, func, string } from 'prop-types';

class ImageDialog extends Component {
  render() {
    const { open, onClose, image } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Mars</DialogTitle>
        <DialogContent>
          <img src={image} alt="zaglushka" width="255" height="255" />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ImageDialog.propTypes = {
  open: bool,
  onClose: func,
  image: string,
};

export default ImageDialog;
