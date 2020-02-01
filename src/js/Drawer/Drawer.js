import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Snackbar from '@material-ui/core/Snackbar';

import getDrawerInfo from '../api/getDrawerInfo';
import Sidebar from '../Sidebar';
import Alert from '../Alert';

class DrawerSide extends Component {
  state = {
    drawerIsOpen: false,
    info: [],
    optionFlags: {},
    solsRange: {},
    notification: false,
  };

  async componentDidMount() {
    let notification = false;
    let apiInfo;
    try {
      apiInfo = await getDrawerInfo();
    } catch {
      notification = true;
    }

    const flags = Object.fromEntries(apiInfo.map(key => [key.rover, false]));
    const sols = Object.fromEntries(apiInfo.map(key => [key.rover, [0, key.maxSol]]));
    this.setState({ info: apiInfo, optionFlags: flags, solsRange: sols, notification });
  }

  handleChange = rover => {
    this.setState({ optionFlags: { ...this.state.optionFlags, [rover]: !this.state.optionFlags[rover] } });
  };

  handleSolChange = () => {};

  toggleDrawer = isOpen => {
    this.setState({ drawerIsOpen: isOpen });
  };

  handleCloseNotification = () => {
    this.setState({ notification: false });
  };

  render() {
    const { drawerIsOpen, notification } = this.state;
    const notificationText = 'Error. Please contact system administrator';
    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={notification}
          autoHideDuration={6000}
          onClose={this.handleCloseNotification}
        >
          <Alert onClose={this.handleCloseNotification} severity="error">
            {notificationText}
          </Alert>
        </Snackbar>
        <Drawer open={drawerIsOpen} onClose={() => this.toggleDrawer(false)}>
          <Sidebar
            state={this.state}
            handlers={{
              handleChange: this.handleChange,
              handleSolChange: this.handleSolChange,
              toggleDrawer: this.toggleDrawer,
            }}
          />
        </Drawer>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => this.toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </>
    );
  }
}

export default DrawerSide;
