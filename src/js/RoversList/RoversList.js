import React, { Component } from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { object, func } from 'prop-types';

import './roversList.scss';

class RoversList extends Component {
  render() {
    const { elem, handleChange, handleSolChange, optionFlags, solsRange } = this.props;

    return (
      <div key={elem.rover} className="rover-info">
        <MuiExpansionPanel square expanded={optionFlags[elem.rover]}>
          <MuiExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
            <FormControlLabel
              control={
                <Checkbox
                  value={elem.rover}
                  checked={optionFlags[elem.rover]}
                  onChange={() => handleChange(elem.rover)}
                />
              }
              label={elem.rover}
            />
          </MuiExpansionPanelSummary>
          <MuiExpansionPanelDetails>
            {elem.cameras.map(camera => (
              <Tooltip
                key={camera.name}
                title={<span className="photo-card__tooltip">{`Full name: ${camera.full_name}`}</span>}
                placement="right-start"
              >
                <FormControlLabel control={<Checkbox value={camera.name} />} label={camera.name} />
              </Tooltip>
            ))}
            <Typography id="range-slider" gutterBottom>
              Sols range
            </Typography>
            <Slider
              min={0}
              max={elem.maxSol}
              value={solsRange[elem.rover]}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              onChange={event => handleSolChange(event, elem.rover)}
            />
            <FormHelperText>Choose cameras and sols</FormHelperText>
          </MuiExpansionPanelDetails>
        </MuiExpansionPanel>
      </div>
    );
  }
}

RoversList.propTypes = {
  elem: object,
  handleChange: func,
  handleSolChange: func,
  optionFlags: object,
  solsRange: object,
};

export default RoversList;
