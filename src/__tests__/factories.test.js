/* global describe, it, expect, beforeEach */

import { FactoryHelpers } from "../utils";
import { ShipFactory, GameboardFactory, PlayerFactory } from "../factories";

// ========================================= ShipFactory =====================================

describe("ShipFactory", () => {
  const ship = ShipFactory(3);

  it("should create a ship object with the correct length", () => {
    // Incoming query - Assert the expected output
    expect(ship.length).toBe(3);
  });

  it("should create a ship object with initial hits count of 0", () => {
    // Incoming query - Assert the expected output
    expect(ship.hits).toBe(0);
  });

  it("s hit() method should increase the hits count", () => {
    // Incoming command - Assert the direct public side effect
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it("s isSunk() method should return false when hits count is less than length", () => {
    // Incoming query - Assert the expected output
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  it("s isSunk() method should return true when hits count equals length", () => {
    // Incoming query - Assert the expected output
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

// ====================================== GameboardFactory ===================================

describe("GameboardFactory", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = GameboardFactory();
  });

  it("should create a grid with a size of 10x10", () => {
    // Incoming command - Assert the direct public side effects
    const grid = gameboard.getGrid();
    expect(grid.length).toBe(10);
    expect(grid.every((row) => row.length === 10)).toBe(true);
  });

  it("should place a ship at specific coordinates", () => {
    // Incoming command - Assert the direct public side effects
    const ship = ShipFactory(3);
    const coordinates = [
      [4, 4],
      [4, 5],
      [4, 6],
    ];

    const result = gameboard.placeShip(ship, coordinates);

    expect(result).toBe(true);
    expect(gameboard.getShips()).toContain(ship);
    expect(gameboard.getShipCoordinates(ship)).toEqual(coordinates);
  });

  it("should return false when placing a ship at overlapping coordinates", () => {
    // Incoming command - Assert the direct public side effect
    const ship1 = ShipFactory(3);
    const ship2 = ShipFactory(2);
    const coordinates1 = [
      [4, 4],
      [4, 5],
      [4, 6],
    ];

    const coordinates2 = [
      [4, 5],
      [4, 6],
    ];

    gameboard.placeShip(ship1, coordinates1);

    const result = gameboard.placeShip(ship2, coordinates2);

    expect(result).toBe(false);
  });

  it("should correctly handle receiving an attack on a ship", () => {
    // Incoming command - Assert the direct public side effect
    const ship = ShipFactory(3);
    const coordinates = [
      [5, 5],
      [5, 6],
      [5, 7],
    ];

    gameboard.placeShip(ship, coordinates);

    const alphanumericCoordinate = FactoryHelpers.convertToAlphanumeric([5, 5]);

    gameboard.receiveAttack(alphanumericCoordinate);

    expect(ship.hits).toBe(1);
  });

  it("should correctly handle receiving a missed attack", () => {
    // Incoming command - Assert the direct public side effect
    gameboard.receiveAttack("A1");
    gameboard.receiveAttack("B2");
    gameboard.receiveAttack("C3");

    expect(gameboard.getMissedAttacks()).toEqual(["A1", "B2", "C3"]);
  });

  it("should record all missed attacks", () => {
    // Incoming command - Assert the direct public side effect
    const missedCoordinates = ["A1", "B2", "C3"];

    missedCoordinates.forEach((coord) => {
      gameboard.receiveAttack(coord);
    });

    expect(gameboard.getMissedAttacks()).toEqual(missedCoordinates);
  });

  it("should correctly determine if all ships have been sunk", () => {
    // Incoming query - Assert the expected output
    const ship1 = ShipFactory(3);
    const ship2 = ShipFactory(2);
    const ship3 = ShipFactory(4);
    const coordinates1 = [
      [2, 2],
      [2, 3],
      [2, 4],
    ];
    const coordinates2 = [
      [4, 4],
      [4, 5],
    ];
    const coordinates3 = [
      [6, 6],
      [6, 7],
      [6, 8],
      [6, 9],
    ];

    gameboard.placeShip(ship1, coordinates1);
    gameboard.placeShip(ship2, coordinates2);
    gameboard.placeShip(ship3, coordinates3);

    ship1.hit();
    ship1.hit();
    ship1.hit();
    ship2.hit();
    ship2.hit();
    ship3.hit();
    ship3.hit();
    ship3.hit();
    ship3.hit();

    expect(gameboard.allShipsSunk()).toBe(true);
  });

  it("should correctly determine if not all ships have been sunk", () => {
    // Incoming query - Assert the expected output
    const ship1 = ShipFactory(3);
    const ship2 = ShipFactory(2);
    const ship3 = ShipFactory(4);
    const coordinates1 = [
      [2, 2],
      [2, 3],
      [2, 4],
    ];
    const coordinates2 = [
      [4, 4],
      [4, 5],
    ];
    const coordinates3 = [
      [6, 6],
      [6, 7],
      [6, 8],
      [6, 9],
    ];

    gameboard.placeShip(ship1, coordinates1);
    gameboard.placeShip(ship2, coordinates2);
    gameboard.placeShip(ship3, coordinates3);

    ship1.hit();
    ship1.hit();
    ship2.hit();
    ship3.hit();
    ship3.hit();

    expect(gameboard.allShipsSunk()).toBe(false);
  });
});

// ======================================= PlayerFactory =====================================

describe("PlayerFactory", () => {
  let player;

  beforeEach(() => {
    player = PlayerFactory("Computer");
  });

  it("should create a player object with the given name", () => {
    // Incoming query - Assert the expected output
    expect(player.name).toBe("Computer");
  });

  it("should have an attack method", () => {
    // Incoming query - Assert the presence of the attack method
    expect(typeof player.attack).toBe("function");
  });

  describe("attack method", () => {
    let enemyGameboard;

    beforeEach(() => {
      enemyGameboard = GameboardFactory();
    });

    it("should increase missedAttacks length when missing a target", () => {
      // Incoming command - Assert the direct public side effect
      const initialMissedAttacks = enemyGameboard.getMissedAttacks().length;

      const coordinate = player.attack(enemyGameboard);
      enemyGameboard.receiveAttack(coordinate);

      const updatedMissedAttacks = enemyGameboard.getMissedAttacks().length;

      expect(updatedMissedAttacks).toBeGreaterThan(initialMissedAttacks);
    });

    it("should increase the ship's hit count when hitting a target", () => {
      // Incoming command - Assert the direct public side effect
      const ship = ShipFactory(3);
      const coordinates = [
        [2, 1],
        [2, 2],
        [2, 3],
      ];
      enemyGameboard.placeShip(ship, coordinates);

      const initialHits = ship.hits;

      // Hit every cell of the grid once
      const gridSize = enemyGameboard.getGrid().length;
      for (let row = 0; row < gridSize; row += 1) {
        for (let col = 0; col < gridSize; col += 1) {
          const coordinate = player.attack(enemyGameboard);
          enemyGameboard.receiveAttack(coordinate);
        }
      }

      const updatedHits = ship.hits;

      expect(updatedHits).toBeGreaterThan(initialHits);
    });

    it("should not attack the same coordinate twice", () => {
      // Incoming command - Assert the direct public side effect
      const attackedCoordinates = new Set();
      const gridSize = enemyGameboard.getGrid().length;

      // Hit every cell of the grid once
      for (let row = 0; row < gridSize; row += 1) {
        for (let col = 0; col < gridSize; col += 1) {
          const coordinate = player.attack(enemyGameboard);

          // Check if the attacked coordinate is unique
          const isUniqueCoordinate = !attackedCoordinates.has(coordinate);

          expect(isUniqueCoordinate).toBe(true);

          attackedCoordinates.add(coordinate);
        }
      }
    });

    it("should only attack valid coordinates within the enemy Gameboard", () => {
      // Incoming command - Assert the direct public side effect
      const gridSize = enemyGameboard.getGrid().length;
      const validCoordinates = FactoryHelpers.getAllValidCoordinates(gridSize);
      const attackedCoordinates = new Set();

      // Hit every cell on the grid once
      for (let row = 0; row < gridSize; row += 1) {
        for (let col = 0; col < gridSize; col += 1) {
          const coordinate = player.attack(enemyGameboard);
          attackedCoordinates.add(coordinate);
        }
      }

      // Check if all attacked coordinates are valid by verifying if each coordinate
      // is included in the validCoordinates array
      const allAttacksValid = Array.from(attackedCoordinates).every(
        (coordinate) => validCoordinates.includes(coordinate)
      );

      expect(allAttacksValid).toBe(true);
    });
  });
});
