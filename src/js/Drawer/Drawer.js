import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import getDrawerInfo from '../api/getDrawerInfo';
import Sidebar from '../Sidebar';

class DrawerSide extends Component {
  state = {
    drawerIsOpen: false,
    info: [],
    optionFlags: {},
    solsRange: {},
  };

  async componentDidMount() {
    const apiInfo = await getDrawerInfo();
    const flags = Object.fromEntries(apiInfo.map(key => [key.rover, false]));
    const sols = Object.fromEntries(apiInfo.map(key => [key.rover, [0, key.maxSol]]));
    this.setState({ info: apiInfo, optionFlags: flags, solsRange: sols });
  }

  handleChange = rover => {
    this.setState({ optionFlags: { ...this.state.optionFlags, [rover]: !this.state.optionFlags[rover] } });
  };

  handleSolChange = () => {};

  toggleDrawer = isOpen => {
    this.setState({ drawerIsOpen: isOpen });
  };

  render() {
    const { drawerIsOpen } = this.state;
    return (
      <>
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
