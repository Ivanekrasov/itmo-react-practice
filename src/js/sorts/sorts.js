const CHANGE_PLUS = 1;
const CHANGE_MINUS = -1;

function sorts(table, key) {
  return table.sort((elemA, elemB) => {
    return elemA[key] > elemB[key] ? CHANGE_PLUS : CHANGE_MINUS
  });
}

export default sorts;
