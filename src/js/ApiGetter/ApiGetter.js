import React, { Component } from 'react';
import '../../scss/main.scss';

const API_KEY = 'LR7eqPMCqaBKMlIEKf17ExpE4DlGwExDHLCXhGrZ';

class ApiGetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
    };
  }

  getInfoFromAPI = async (page = 1) => {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&page=${page}&api_key=${API_KEY}`;
    const response = await fetch(url);
    await console.log(await response.json());
  };

  render() {
    return (
      <div className="api-getter">
        <button className="test-button" onClick={() => this.getInfoFromAPI()}>
          Test
        </button>
      </div>
    );
  }
}

export default ApiGetter;
