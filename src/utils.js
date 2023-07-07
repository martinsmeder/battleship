const FactoryUtils = (() => {
  const convertToIndices = (coordinate) => {
    const column = coordinate.charCodeAt(0) - 65; // Convert column letter to index
    const row = parseInt(coordinate.slice(1), 10) - 1; // Convert row number to index with radix 10
    return [row, column];
  };

  const convertToAlphanumeric = ([row, column]) => {
    const coordinate = String.fromCharCode(column + 65); // Convert column index to letter
    return coordinate + (row + 1); // Convert row index to number
  };

  return {
    convertToIndices,
    convertToAlphanumeric,
  };
})();

export default FactoryUtils;
