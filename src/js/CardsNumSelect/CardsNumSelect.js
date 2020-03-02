import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem, InputLabel } from '@material-ui/core';
import { func, number, arrayOf } from 'prop-types';

const RowsNumSelect = props => {
  const [value, setValue] = useState(props.defaultValue);
  return (
    <FormControl>
      <InputLabel>Per page:</InputLabel>
      <Select
        value={value}
        labelId="rows-select-label"
        id="rows-select"
        onChange={e => {
          props.handleRowsNumChange(e);
          setValue(e.target.value);
        }}
      >
        {props.rowsValues.map(el => (
          <MenuItem key={el} value={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

RowsNumSelect.propTypes = {
  handleRowsNumChange: func,
  rowsValues: arrayOf(number),
  defaultValue: number,
};

export default RowsNumSelect;
