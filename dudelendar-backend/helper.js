function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage] == -0
    ? 0
    : (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function renameKey(obj, oldKey, newKey) {
  if (obj[oldKey] != undefined) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
}

module.exports = {
  getOffset,
  emptyOrRows,
  renameKey,
};
