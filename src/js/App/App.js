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
      <div className="main">
        <button onClick={() => console.log(this.state)}></button>
        <Header />
        <NasaTable className="container" />
      </div>
    );
  }
}

export default App;
