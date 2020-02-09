import React, { Component, Fragment } from 'react';
import TablePage from './TablePage';
import Header from './Header'
import '../../scss/main.scss';

class App extends Component {
  render() {
    return (
        <Fragment>
          <Header/>
          <TablePage className='container'/>
        </Fragment>
    )
  }
}

export default App;
