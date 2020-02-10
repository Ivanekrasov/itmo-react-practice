import React, { Component } from 'react';
import '../../scss/main.scss';

import ApiGetter from '../ApiGetter';

class App extends Component {
  render() {
    return (
      <div>
        <ApiGetter />
      </div>
    );
  }
}

export default App;
