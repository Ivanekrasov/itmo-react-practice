import React, { Component } from 'react';
import '../../scss/main.scss';

const API_KEY = 'LR7eqPMCqaBKMlIEKf17ExpE4DlGwExDHLCXhGrZ';

const TEST_ROVER = 'curiosity';
const TEST_SOL = 1000;
const TEST_CAMERA = 'fhaz';
const TEST_PAGE = 1;

class ApiGetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
    };
  }

  getInfoFromAPI = async (rover = TEST_ROVER, sol = TEST_SOL, camera = TEST_CAMERA, page = TEST_PAGE) => {
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

  getTestTable = () => {
    try {
      return (
        <table className="test-table">
          <tbody>
            <tr key="main">
              {Object.keys(this.state.table[0]).map((cell, cellInd) => (
                // eslint-disable-next-line react/jsx-key
                <td key={`cellInd${cellInd}`}>{cell}</td>
              ))}
            </tr>
            {this.state.table.map((elem, index) => {
              return (
                <tr key={index}>
                  {Object.keys(elem).map((cell, cellInd) => (
                    // eslint-disable-next-line react/jsx-key
                    <td key={`cellInd${cellInd}`}>{elem[cell]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } catch (error) {
      return false;
    }
  };

  render() {
    return (
      <div className="api-getter">
        <button className="test-button" onClick={() => this.getInfoFromAPI()}>
          Test
        </button>
        {this.getTestTable()}
      </div>
    );
  }
}

export default ApiGetter;
