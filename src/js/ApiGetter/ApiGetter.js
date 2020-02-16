import React, { Component } from 'react';

import '../../scss/main.scss';

import getInfoFromAPI from '../api/api';
import sorts from '../sorts/sorts';

class ApiGetter extends Component {
  state = {
    table: [],
  };

  getTestTable = () => {
    try {
      return (
        <table className="test-table">
          <tbody>
            <tr key="main">
              {Object.keys(this.state.table[0]).map((cell, cellInd) => (
                <td key={`cellInd${cellInd}`}>{cell}</td>
              ))}
            </tr>
            {this.state.table.map((elem, index) => {
              return (
                <tr key={index}>
                  {Object.keys(elem).map((cell, cellInd) => (
                    <td key={`cellInd${cellInd}`}>{elem[cell]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } catch (error) {
      return false;
    }
  };

  render() {
    return (
      <div className="api-getter">
        <button className="test-button" onClick={async () => this.setState(await getInfoFromAPI())}>
          Test
        </button>
        <button
          className="test-button sort-button"
          onClick={() => this.setState({ table: sorts(this.state.table, 'camera') })}
        >
          Sort by camera
        </button>
        {this.getTestTable()}
      </div>
    );
  }
}

export default ApiGetter;
