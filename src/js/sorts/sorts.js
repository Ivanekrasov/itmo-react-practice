const CHANGE_PLUS = 1;
const LEAVE_ELEM = 0;
const CHANGE_MINUS = -1;

function sorts(table, key) {
  return table.sort((elemA, elemB) => {
    if (elemA[key] > elemB[key]) return CHANGE_PLUS;
    if (elemA[key] < elemB[key]) return CHANGE_MINUS;
    return LEAVE_ELEM;
  });
}

export default sorts;
