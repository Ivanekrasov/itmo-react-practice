import headersMapping from './tableHeadersMapping';

const API_KEY = 'LR7eqPMCqaBKMlIEKf17ExpE4DlGwExDHLCXhGrZ';

const TEST_ROVER = 'curiosity';
const TEST_SOL = 1000;
const TEST_CAMERA = 'fhaz';
const TEST_PAGE = 1;

const headers = Object.keys(headersMapping);

async function getInfoFromAPI(rover = TEST_ROVER, sol = TEST_SOL, camera = TEST_CAMERA, page = TEST_PAGE) {
  try {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&page=${page}&api_key=${API_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();

    const URL_SEPARATOR = '/';

    return {
      headers,
      table: responseJson.photos.map(photoObj => ({
        [Object.values(headersMapping)[0]]: photoObj.img_src.split(URL_SEPARATOR).slice(-1)[0],
        [Object.values(headersMapping)[1]]: photoObj.sol,
        [Object.values(headersMapping)[2]]: photoObj.camera.name,
        [Object.values(headersMapping)[3]]: photoObj.camera.full_name,
        [Object.values(headersMapping)[4]]: photoObj.rover.name,
        [Object.values(headersMapping)[5]]: photoObj.rover.status,
      })),
    };
  } catch (error) {
    return { table: [] };
  }
}

export default getInfoFromAPI;
