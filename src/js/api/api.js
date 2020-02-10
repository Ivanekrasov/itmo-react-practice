const API_KEY = 'LR7eqPMCqaBKMlIEKf17ExpE4DlGwExDHLCXhGrZ';

const TEST_ROVER = 'curiosity';
const TEST_SOL = 1000;
const TEST_CAMERA = 'fhaz';
const TEST_PAGE = 1;

async function getInfoFromAPI(rover = TEST_ROVER, sol = TEST_SOL, camera = TEST_CAMERA, page = TEST_PAGE) {
  const tableInfo = [];
  try {
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
    return { table: tableInfo };
  } catch (error) {
    return { table: [] };
  }
}

export default getInfoFromAPI;
