import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { bool, func } from 'prop-types';

import headersMapping from '../api/tableHeadersMapping';

import './sortSelect.scss';

class SortSelect extends Component {
  handleChange = event => {
    this.props.sortData(this.props.isDescendingSort, event.target.value);
  };

  render() {
    return (
      <FormControl className="form">
        <InputLabel id="nasa-simple-select-label">Sort by:</InputLabel>
        <Select labelId="nasa-simple-select-label" id="nasa-simple-select" autoWidth onChange={this.handleChange}>
          {Object.keys(headersMapping).map(element => {
            const FULL_CAMERA_NAME = 'Full camera name';
            return element === FULL_CAMERA_NAME ? null : (
              <MenuItem key={element} value={element}>
                {element}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

SortSelect.propTypes = {
  isDescendingSort: bool,
  sortData: func,
};

export default SortSelect;
