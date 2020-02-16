import React, { Component } from 'react';

import NasaTable from '../NasaTable';
import Header from '../Header';

import sorts from '../sorts/sorts';
import getInfoFromAPI from '../api/api';

import './App.scss';

class App extends Component {
  state = {
    table: [],
  };

  async componentDidMount() {
    this.setState(await getInfoFromAPI());
  }

  sortState = key => {
    this.setState({ table: sorts(this.state.table, key) });
  };

  render() {
    return (
      <>
        <Header />
        <NasaTable className="container" />
      </>
    );
  }
}

export default App;
