import React, { Component } from 'react';

import NasaTable from '../NasaTable';
import Header from '../Header';
import getInfoFromAPI from '../api/api';

import './App.scss';

class App extends Component {
  state = {
    data: {
      headers: [],
      table: [],
    },
  };

  async componentDidMount() {
    this.setState({ data: { ...(await getInfoFromAPI()) } }, () => console.log('app state mount', this.state));
  }

  handleUserQuery = async state => {
    const activeRovers = Object.keys(state.optionFlags)
      .filter(elem => state.optionFlags[elem]) // filtering selected rovers
      .map(rover => {
        // filtering selected cameras for rover and adding selected sols range
        return {
          rover,
          sol: state.solsRange[rover],
          cameras: [...Object.keys(state.cameras[rover]).filter(elem => state.cameras[rover][elem])],
        };
      });
    const promiseArray = await Promise.all(
      activeRovers.map(elem => getInfoFromAPI([elem.rover], elem.sols, elem.cameras)), // pending info from api
    );

    this.setState(
      {
        data: {
          headers: promiseArray[0].headers,
          table: promiseArray.map(element => element.table).flat(),
        },
      },
      () => console.log('app state', this.state),
    );
  };

  render() {
    return (
      <>
        <Header handleUserQuery={this.handleUserQuery} />
        <NasaTable className="container" data={this.state.data} />
      </>
    );
  }
}

export default App;
