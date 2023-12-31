export const FactoryHelpers = (() => {
  const validCoordinates = [];

  const convertToIndices = (coordinate) => {
    const column = coordinate.charCodeAt(0) - 65; // Convert column letter to index
    const row = parseInt(coordinate.slice(1), 10); // Convert row number to index with radix 10
    return [row, column];
  };

  const convertToAlphanumeric = ([row, column]) => {
    const coordinate = String.fromCharCode(column + 65); // Convert column index to letter
    return coordinate + row; // Convert row index to number
  };

  const getAllValidCoordinates = (gridSize) => {
    for (let row = 0; row < gridSize; row += 1) {
      for (let col = 0; col < gridSize; col += 1) {
        const alphanumericCoordinate = convertToAlphanumeric([row, col]);
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
  const shipTypes = [
    { type: "carrier", length: 5 },
    { type: "battleship", length: 4 },
    { type: "destroyer", length: 3 },
    { type: "submarine", length: 3 },
    { type: "patrol boat", length: 2 },
  ];

  const toggleModal = (modal, choice) => {
    const toggledModal = modal;

    const overlay = modal.closest(".overlay");
    const displayValue = choice === "show" ? "flex" : "none";

    overlay.style.display = displayValue;
    toggledModal.style.display = displayValue;
  };

  return {
    shipTypes,
    toggleModal,
  };
})();
