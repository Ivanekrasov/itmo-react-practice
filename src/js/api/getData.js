import getInfoFromAPI from './api';

// const TEST_ROVERS = ['curiosity', 'opportunity', 'spirit'];
// const TEST_SOL = 1000;
// const TEST_CAMERA = 'fhaz';
// const TEST_PAGE = 1;

async function getData() {
  const data = await getInfoFromAPI();

  console.log(data);

  const outputData = {
    headers: ['Name', 'SOL', 'Camera', 'Rover name', 'Status'],
    table: [],
  };
  data.map(elem => {
    const tempCell = {
      info: [],
      url: elem.imgName,
    };
    tempCell.info.push(elem.imgName.slice(elem.imgName.lastIndexOf('/')));
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
