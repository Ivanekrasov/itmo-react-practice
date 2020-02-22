import React, { Component } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core/styles';

import { bool, func } from 'prop-types';
import headersMapping from '../api/tableHeadersMapping';

const NasaForm = styled(FormControl)({
  minWidth: 80,
});

class SortSelect extends Component {
  handleChange = event => {
    this.props.sortData(this.props.isDescendingSort, event.target.value);
  };

  render() {
    return (
      <NasaForm className="form">
        <InputLabel id="nasa-simple-select-label">Sort by:</InputLabel>
        <Select
          labelId="nasa-simple-select-label"
          id="nasa-simple-select"
          autoWidth={true}
          onChange={this.handleChange}
        >
          {Object.keys(headersMapping).map(element => {
            if (element === 'Full camera name') return true;
            return (
              <MenuItem key={element} value={element}>
                {element}
              </MenuItem>
            );
          })}
        </Select>
      </NasaForm>
    );
  }
}

SortSelect.propTypes = {
  isDescendingSort: bool,
  sortData: func,
};

export default SortSelect;
