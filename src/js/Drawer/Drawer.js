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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import getDrawerInfo from '../api/getDrawerInfo';

const NasaList = styled(List)({
  width: 250,
});

const NasaExpansion = styled(MuiExpansionPanel)({
  boxShadow: 'none',
});

const NasaCameras = styled(MuiExpansionPanelDetails)({
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid grey',
});

class DrawerSide extends Component {
  state = {
    drawerIsOpen: false,
    info: [],
    optionFlags: {},
  };

  async componentDidMount() {
    const apiInfo = await getDrawerInfo();
    const flags = Object.fromEntries(apiInfo.map(key => [key.rover, false]));

    this.setState({ info: apiInfo, optionFlags: flags });
  }

  handleChange = rover => {
    this.setState({ optionFlags: { ...this.state.optionFlags, [rover]: !this.state.optionFlags[rover] } });
  };

  sideList = () => (
    <div role="presentation" onKeyDown={this.toggleDrawer(false)}>
      <NasaList>
        <ListItem>
          <FormControl component="fieldset">
            <FormLabel component="legend">Rovers:</FormLabel>
            <FormGroup>
              {this.state.info.map(elem => (
                <div key={elem.rover} className="rover-info">
                  <NasaExpansion square expanded={this.state.optionFlags[elem.rover]}>
                    <MuiExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={elem.rover}
                            checked={this.state.optionFlags[elem.rover]}
                            onChange={() => this.handleChange(elem.rover)}
                          />
                        }
                        label={elem.rover}
                      />
                    </MuiExpansionPanelSummary>
                    <NasaCameras>
                      {elem.cameras.map(camera => (
                        <FormControlLabel
                          key={camera.name}
                          control={<Checkbox value={camera.name} />}
                          label={camera.name}
                        />
                      ))}
                      <FormHelperText>Choose cameras</FormHelperText>
                    </NasaCameras>
                  </NasaExpansion>
                </div>
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

export default DrawerSide;
