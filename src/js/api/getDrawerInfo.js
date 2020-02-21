const API_KEY = 'LR7eqPMCqaBKMlIEKf17ExpE4DlGwExDHLCXhGrZ';

async function getDrawerInfo() {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${API_KEY}`;
  const promise = await fetch(url);
  const json = await promise.json();
  const rovers = json.rovers.map(element => {
    return { rover: element.name, maxSol: element.max_sol, cameras: element.cameras };
  });

  return rovers;
}

export default getDrawerInfo;
