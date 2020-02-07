import React, { Component } from 'react';
import '../../scss/main.scss';

import ApiGetter from '../ApiGetter/ApiGetter';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <button>123</button>
        <ApiGetter />
      </div>
    );
  }
}

export default App;
