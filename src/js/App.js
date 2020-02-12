import React, { Component } from 'react';

import TablePage from './pages/TablePage';
import Header from './components/Header';

import '../scss/main.scss';

class App extends Component {
  render() {
    return (
        <>
          <Header/>
          <TablePage className='container'/>
        </>
    )
  }
}

export default App;
