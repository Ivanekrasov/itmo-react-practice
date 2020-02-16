const CHANGE_PLUS = 1;
const CHANGE_MINUS = -1;

let sortHigh = true;

function sorts(table, key) {
  if (sortHigh) {
    sortHigh = false;
    return table.sort((elemA, elemB) => {
      return elemA[key] > elemB[key] ? CHANGE_PLUS : CHANGE_MINUS;
    });
  }
  sortHigh = true;
  return table.sort((elemA, elemB) => {
    return elemA[key] < elemB[key] ? CHANGE_PLUS : CHANGE_MINUS;
  });
}

export default sorts;
