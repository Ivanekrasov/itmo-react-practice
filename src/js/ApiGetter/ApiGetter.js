import React, { Component } from 'react';

import '../../scss/main.scss';

import getInfoFromAPI from '../api/api';

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
                // eslint-disable-next-line react/jsx-key
                <td key={`cellInd${cellInd}`}>{cell}</td>
              ))}
            </tr>
            {this.state.table.map((elem, index) => {
              return (
                <tr key={index}>
                  {Object.keys(elem).map((cell, cellInd) => (
                    // eslint-disable-next-line react/jsx-key
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
        {this.getTestTable()}
      </div>
    );
  }
}

export default ApiGetter;
