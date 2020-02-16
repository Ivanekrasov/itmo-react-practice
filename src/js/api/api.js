const API_KEY = 'LR7eqPMCqaBKMlIEKf17ExpE4DlGwExDHLCXhGrZ';

const TEST_ROVER = ['curiosity', 'opportunity', 'spirit'];
const TEST_SOL = [2000];
const TEST_CAMERA = ['fhaz', 'rhaz'];
const TEST_PAGE = 1;

function getInfoFromPromise(response, table) {
  response.photos.forEach(elem => {
    const tempDay = {
      imgName: elem.img_src,
      sol: elem.sol,
      cameraShort: elem.camera.name,
      cameraFull: elem.camera.full_name,
      roverName: elem.rover.name,
      roverStatus: elem.rover.status,
    };
    table.push(tempDay);
  });
}

async function getInfoFromAPI(rover = TEST_ROVER, sol = TEST_SOL, camera = TEST_CAMERA, page = TEST_PAGE) {
  const tableInfo = [];
  try {
    const promiseStack = [];
    rover.map(rov => {
      camera.map(cam => {
        sol.map(solElem => {
          const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rov}/photos?sol=${solElem}&camera=${cam}&page=${page}&api_key=${API_KEY}`;
          const promise = fetch(url).then(response => response.json());
          promiseStack.push(promise);
          return true;
        });
        return true;
      });
      return true;
    });

    const responseStack = await Promise.all(promiseStack);
    responseStack.map(response => getInfoFromPromise(response, tableInfo));
    return tableInfo;
  } catch (error) {
    return [];
  }
}

export default getInfoFromAPI;
