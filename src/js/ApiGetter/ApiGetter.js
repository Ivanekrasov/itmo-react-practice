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

  getInfoFromAPI = async (rover = 'curiosity', sol = 1000, camera = 'fhaz', page = 1) => {
    const tableInfo = [];
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&page=${page}&api_key=${API_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    await responseJson.photos.forEach(elem => {
      const tempDay = {
        imgName: elem.img_src,
        sol: elem.sol,
        cameraShort: elem.camera.name,
        cameraFull: elem.camera.full_name,
        roverName: elem.rover.name,
        roverStatus: elem.rover.status,
      };
      tableInfo.push(tempDay);
      return true;
    });
    this.setState({ table: tableInfo });
    console.table(this.state.table);
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
