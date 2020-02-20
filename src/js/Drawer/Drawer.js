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

const NasaList = styled(List)({
  width: 250,
});

class DrawerSide extends Component {
  state = {
    drawerIsOpen: false,
  };

  sideList = () => (
    <div role="presentation" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
      <NasaList>
        <ListItem button>
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
