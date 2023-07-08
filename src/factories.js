import FactoryUtils from "./utils";

export const ShipFactory = (length) => {
  let hits = 0;

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => hits >= length; // Return true if hits is equal to or greater than length

  return {
    length,
    hit,
    isSunk,
    get hits() {
      // Getter function for hits. Using function declaration to ensure it has access to the
      // `hits` variable dynamically, since function declarations are hoisted and can be used
      // before they are defined. This allows accessing the current value of `hits` even before
      // calling the `hit` function
      return hits;
    },
  };
};

export const GameboardFactory = () => {
  const gridSize = 10;
  const grid = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );

  const missedAttacks = [];

  const getGrid = () => grid;

  const placeShip = (ship, coordinates) => {
    const convertedCoordinates = coordinates.map((coord) =>
      FactoryUtils.convertToIndices(coord)
    );
    const withinBoundaries = convertedCoordinates.every(
      ([row, col]) => row >= 0 && row < gridSize && col >= 0 && col < gridSize
    );
    const conflicts = convertedCoordinates.some(
      ([row, col]) => grid[row][col] !== null
    );

    if (withinBoundaries && !conflicts) {
      const shipInfo = {
        ship,
        coordinates: convertedCoordinates,
      };

      shipInfo.coordinates.forEach(([row, col]) => {
        grid[row][col] = shipInfo;
      });

      return true; // Ship placement successful
    }

    return false; // Ship placement failed
  };

  const getShips = () => {
    const ships = [];

    for (let row = 0; row < gridSize; row += 1) {
      for (let col = 0; col < gridSize; col += 1) {
        const cell = grid[row][col];
        if (
          cell !== null &&
          cell.ship &&
          !ships.includes(cell.ship) &&
          !cell.ship.isSunk()
        ) {
          ships.push(cell.ship);
        }
      }
    }

    return ships;
  };

  const getShipCoordinates = (ship) => {
    const coordinates = [];

    for (let row = 0; row < gridSize; row += 1) {
      for (let col = 0; col < gridSize; col += 1) {
        const cell = grid[row][col];
        if (cell && cell.ship === ship) {
          coordinates.push(FactoryUtils.convertToAlphanumeric([row, col]));
        }
      }
    }

    return coordinates;
  };

  const receiveAttack = (coordinate) => {
    const [row, col] = FactoryUtils.convertToIndices(coordinate);
    const cell = grid[row][col];

    const ship = cell && cell.ship; // Access the ship property of the cell object

    if (ship) {
      ship.hit(); // Increment hit count of the ship
    } else {
      missedAttacks.push(coordinate); // Record missed attack coordinates
    }
  };

  // Function to get the coordinates of missed attacks on the gameboard
  const getMissedAttacks = () => {
    // Return an array of coordinates representing missed attacks on the gameboard
  };

  // Function to determine if all ships on the gameboard have been sunk
  const allShipsSunk = () => {
    // Check if all ships on the gameboard have been sunk
    // Return true if all ships are sunk, false otherwise
  };

  // Return the public interface of the GameboardFactory
  return {
    getGrid,
    placeShip,
    getShips,
    getShipCoordinates,
    receiveAttack,
    getMissedAttacks,
    allShipsSunk,
  };
};
