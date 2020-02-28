import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { func } from 'prop-types';

import getDrawerInfo from '../api/getDrawerInfo';
// import getData from '../api/api';
import Sidebar from '../Sidebar';

class DrawerSide extends Component {
  state = {
    drawerIsOpen: false,
    info: [],
    optionFlags: {},
    solsRange: {},
    cameras: {},
  };

  async componentDidMount() {
    const apiInfo = await getDrawerInfo();
    const flags = Object.fromEntries(apiInfo.map(key => [key.rover, false]));
    const sols = Object.fromEntries(apiInfo.map(key => [key.rover, key.maxSol]));
    const cameras = Object.fromEntries(
      apiInfo.map(key => [
        key.rover,
        Object.fromEntries(
          key.cameras.map(cam => {
            return [cam.name, false];
          }),
        ),
      ]),
    );
    this.setState({ info: apiInfo, optionFlags: flags, solsRange: sols, cameras });
  }

  handleChange = rover => {
    this.setState({ optionFlags: { ...this.state.optionFlags, [rover]: !this.state.optionFlags[rover] } });
  };

  handleSolChange = rover => (event, value) => {
    this.setState({ solsRange: { ...this.state.solsRange, [rover]: value } });
  };

  handleCameraChange = (rover, camera) => {
    this.setState({
      cameras: {
        ...this.state.cameras,
        [rover]: { ...this.state.cameras[rover], [camera]: !this.state.cameras[rover][camera] },
      },
    });
  };

  handleApi = () => {
    this.props.handleUserQuery(this.state);

    this.toggleDrawer(false);
  };

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

DrawerSide.propTypes = {
  handleUserQuery: func,
};

export default DrawerSide;
