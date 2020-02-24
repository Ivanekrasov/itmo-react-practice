import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { func } from 'prop-types';
import DrawerSide from '../Drawer';

import './header.scss';

class Header extends Component {
  render() {
    return (
      <>
        <AppBar className="table-header">
          <Toolbar>
            <DrawerSide handleUserQuery={this.props.handleUserQuery} />
            <Typography variant="h6">Space table</Typography>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

Header.propTypes = {
  handleUserQuery: func,
};

export default Header;
