import getInfoFromAPI from './api';

const SLICE_NAME = -40;

async function getData() {
  const data = await getInfoFromAPI();
  const outputData = {
    headers: ['Name', 'SOL', 'Camera', 'Rover name', 'Status'],
    table: [],
  };
  data.table.map(elem => {
    const tempCell = {
      info: [],
      url: elem.imgName,
    };
    tempCell.info.push(elem.imgName.slice(SLICE_NAME));
    tempCell.info.push(elem.sol);
    tempCell.info.push(elem.cameraShort);
    tempCell.info.push(elem.roverName);
    tempCell.info.push(elem.roverStatus);
    outputData.table.push(tempCell);
    return true;
  });

  return outputData;
}

export default getData;
