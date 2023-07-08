export const FactoryHelpers = (() => {
  const validCoordinates = [];

  const convertToIndices = (coordinate) => {
    const column = coordinate.charCodeAt(0) - 65; // Convert column letter to index
    const row = parseInt(coordinate.slice(1), 10) - 1; // Convert row number to index with radix 10
    return [row, column];
  };

  const convertToAlphanumeric = ([row, column]) => {
    const coordinate = String.fromCharCode(column + 65); // Convert column index to letter
    return coordinate + (row + 1); // Convert row index to number
  };

  const getAllValidCoordinates = (gridSize) => {
    for (let row = 0; row < gridSize; row += 1) {
      for (let col = 0; col < gridSize; col += 1) {
        const alphanumericCoordinate = FactoryHelpers.convertToAlphanumeric([
          row,
          col,
        ]);
        validCoordinates.push(alphanumericCoordinate);
      }
    }

    return validCoordinates;
  };

  return {
    convertToIndices,
    convertToAlphanumeric,
    getAllValidCoordinates,
  };
})();

export const AppHelpers = (() => {
  const toggleModal = (modal, choice) => {
    const toggledModal = modal;

    const overlay = modal.closest(".overlay");
    const displayValue = choice === "show" ? "flex" : "none";

    overlay.style.display = displayValue;
    toggledModal.style.display = displayValue;
  };

  return {
    toggleModal,
  };
})();
