import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import List from '@material-ui/core/List';
import FormHelperText from '@material-ui/core/FormHelperText';
import { object, func, shape } from 'prop-types';

import RoversList from '../RoversList';

import './sidebar.scss';

const SideBar = props => (
  <div className="sidebar">
    <List>
      <ListItem>
        <FormControl component="fieldset">
          <FormLabel component="legend">Rovers:</FormLabel>
          <FormGroup>
            {props.state.info.map(elem => (
              <RoversList
                key={elem.rover}
                elem={elem}
                handleChange={props.handlers.handleChange}
                handleSolChange={props.handlers.handleSolChange}
                optionFlags={props.state.optionFlags}
                solsRange={props.state.solsRange}
              />
            ))}
          </FormGroup>
          <FormHelperText>Choose mission of interest</FormHelperText>
        </FormControl>
      </ListItem>
      <ListItem button onClick={() => props.handlers.toggleDrawer(false)}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItem>
    </List>
    <Divider />
  </div>
);

SideBar.propTypes = {
  state: object,
  handlers: shape({
    handleChange: func,
    handleSolChange: func,
  }),
};

export default SideBar;
