import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { func } from 'prop-types';

import DraweSide from '../Drawer';

import './header.scss';

const Header = props => (
  <AppBar className="table-header">
    <Toolbar className="table-header__toolbar">
      <DraweSide handleUserQuery={props.handleUserQuery} />
      <Typography variant="h6">Mars Missions</Typography>
      <img src="/assets/img/main-logo.png" alt="123" className="table-header__logo" />
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  handleUserQuery: func,
};

export default Header;
