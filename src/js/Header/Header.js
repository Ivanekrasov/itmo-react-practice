import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import DraweSide from '../Drawer';

import './header.scss';

class Header extends Component {
  render() {
    return (
      <>
        <AppBar className="table-header">
          <Toolbar>
            <DraweSide />
            <Typography variant="h6">Space table</Typography>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default Header;
