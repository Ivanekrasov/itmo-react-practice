import React, { Component } from 'react';

import { styled } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Snackbar from '@material-ui/core/Snackbar';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

import RoversList from '../RoversList';
import Alert from '../Alert';

import getDrawerInfo from '../api/getDrawerInfo';

const NasaList = styled(List)({
  width: 250,
});

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

  sideList = () => (
    <div role="presentation" onKeyDown={this.toggleDrawer(false)}>
      <NasaList>
        <ListItem>
          <FormControl component="fieldset">
            <FormLabel component="legend">Rovers:</FormLabel>
            <FormGroup>
              {this.state.info.map(elem => (
                <RoversList
                  key={elem.rover}
                  elem={elem}
                  handleChange={this.handleChange}
                  handleSolChange={this.handleSolChange}
                  optionFlags={this.state.optionFlags}
                  solsRange={this.state.solsRange}
                />
              ))}
            </FormGroup>
            <FormHelperText>Choose mission of interest</FormHelperText>
          </FormControl>
        </ListItem>
        <ListItem button onClick={this.toggleDrawer(false)}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={'Search'} />
        </ListItem>
      </NasaList>
      <Divider />
    </div>
  );

  toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ drawerIsOpen: open });
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
        <Drawer open={drawerIsOpen} onClose={this.toggleDrawer(false)}>
          {this.sideList()}
        </Drawer>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </>
    );
  }
}

export default DrawerSide;
