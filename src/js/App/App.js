import React, { Component } from 'react';

// import ApiGetter from '../ApiGetter';
import TablePage from '../TablePage';
import Header from '../Header';

import './App.scss';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <TablePage className="container" />
      </>
    );
  }
}

export default App;
