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

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

import { func } from 'prop-types';

import RoversList from '../RoversList';

import getDrawerInfo from '../api/getDrawerInfo';
// import getData from '../api/api';

const NasaList = styled(List)({
  width: 250,
});

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
                  handleCameraChange={this.handleCameraChange}
                  optionFlags={this.state.optionFlags}
                  solsRange={this.state.solsRange}
                  cameras={this.state.cameras}
                />
              ))}
            </FormGroup>
            <FormHelperText>Choose mission of interest</FormHelperText>
          </FormControl>
        </ListItem>
        <ListItem button onClick={() => this.handleApi()}>
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

  render() {
    const { drawerIsOpen } = this.state;
    return (
      <>
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

DrawerSide.propTypes = {
  handleUserQuery: func,
};

export default DrawerSide;
