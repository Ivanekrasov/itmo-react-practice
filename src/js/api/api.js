import headersMapping from './tableHeadersMapping';

const API_KEY = 'LR7eqPMCqaBKMlIEKf17ExpE4DlGwExDHLCXhGrZ';

const TEST_ROVER = ['curiosity', 'opportunity', 'spirit'];
const TEST_SOL = [2000];
const TEST_CAMERA = ['fhaz', 'rhaz'];
const TEST_PAGE = 1;

const headers = Object.keys(headersMapping);

function getInfoFromPromise(response, table) {
  const URL_SEPARATOR = '/';

  response.photos.map(photoObj =>
    table.push({
      [Object.values(headersMapping)[0]]: photoObj.img_src.slice(photoObj.img_src.lastIndexOf(URL_SEPARATOR)),
      [Object.values(headersMapping)[1]]: photoObj.sol,
      [Object.values(headersMapping)[2]]: photoObj.camera.name,
      [Object.values(headersMapping)[3]]: photoObj.camera.full_name,
      [Object.values(headersMapping)[4]]: photoObj.rover.name,
      [Object.values(headersMapping)[5]]: photoObj.rover.status,
    }),
  );
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

    return {
      headers,
      table: tableInfo,
    };
  } catch (error) {
    return { table: [] };
  }
}

export default getInfoFromAPI;
