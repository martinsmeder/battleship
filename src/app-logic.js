console.log("this also seem to be working");

export const ShipFactory = (length) => {
  let hits = 0;

  function hit() {
    hits += 1;
  }

  function isSunk() {
    return hits === length;
  }

  return {
    length,
    hits,
    hit,
    isSunk,
  };
};

export const GameboardFactory = () => {
  const grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  const missedAttacks = [];

  function placeShip(ship, x, y, direction) {
    const shipLength = ship.length;

    // Check if the ship can be placed within the grid and direction is valid
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error(
        "Invalid coordinates. Ship cannot be placed outside the grid."
      );
    }

    if (direction === "horizontal" && y + shipLength > 10) {
      throw new Error(
        "Invalid coordinates. Ship does not fit within the grid horizontally."
      );
    }

    if (direction === "vertical" && x + shipLength > 10) {
      throw new Error(
        "Invalid coordinates. Ship does not fit within the grid vertically."
      );
    }

    // Place the ship in the grid
    for (let i = 0; i < shipLength; i += 1) {
      if (direction === "horizontal") {
        grid[x][y + i] = ship;
      } else if (direction === "vertical") {
        grid[x + i][y] = ship;
      }
    }

    return ship; // Return the ship object after placing it on the grid
  }

  function receiveAttack(x, y) {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error("Invalid coordinates. Attack must be within the grid.");
    }

    const attackedShip = grid[x][y];

    if (attackedShip === null) {
      missedAttacks.push([x, y]);
    } else {
      attackedShip.hit();
    }
  }

  function allShipsSunk() {
    return grid.every((row) =>
      row.every((cell) => cell === null || cell.isSunk())
    );
  }

  return {
    grid,
    missedAttacks,
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
};
