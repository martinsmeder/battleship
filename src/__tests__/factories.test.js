/* global describe, it, expect, beforeEach */

import { ShipFactory, GameboardFactory, PlayerFactory } from "../factories";

// ========================================= ShipFactory =====================================

describe("ShipFactory", () => {
  const ship = ShipFactory(3);

  it("should create a ship object with the correct length", () => {
    expect(ship.length).toBe(3);
  });

  it("should create a ship object with initial hits count of 0", () => {
    expect(ship.hits).toBe(0);
  });

  it("s hit() method should increase the hits count", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it("s isSunk() method should return false when hits count is less than length", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  it("s isSunk() method should return true when hits count equals length", () => {
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
    const grid = gameboard.getGrid();
    expect(grid.length).toBe(10); // Check number of rows
    expect(grid.every((row) => row.length === 10)).toBe(true); // Check number of columns per row
  });

  it("should place a ship at specific coordinates", () => {
    const ship = ShipFactory(3);
    const coordinates = ["A1", "A2", "A3"];

    gameboard.placeShip(ship, coordinates);

    const ships = gameboard.getShips(); // Retrieve the ships from the gameboard

    expect(ships).toContain(ship);
    expect(gameboard.getShipCoordinates(ships[0])).toEqual(coordinates); // Use the ship from the ships array for retrieving coordinates
  });

  it("should throw an error when placing a ship at overlapping coordinates", () => {
    const ship1 = ShipFactory(3);
    const ship2 = ShipFactory(2);
    const coordinates1 = ["A1", "A2", "A3"];
    const coordinates2 = ["A2", "A3"];

    gameboard.placeShip(ship1, coordinates1);

    const result = gameboard.placeShip(ship2, coordinates2);

    expect(result).toBe(false);
  });

  it("should correctly handle receiving an attack on a ship", () => {
    const ship = ShipFactory(3);
    const coordinates = ["A1", "A2", "A3"];

    gameboard.placeShip(ship, coordinates);

    gameboard.receiveAttack("A1");
    gameboard.receiveAttack("A2");

    expect(ship.hits).toBe(2);
  });

  it("should correctly handle receiving a missed attack", () => {
    gameboard.receiveAttack("A1");
    gameboard.receiveAttack("B2");
    gameboard.receiveAttack("C3");

    expect(gameboard.getMissedAttacks()).toEqual(["A1", "B2", "C3"]);
  });

  it("should record all missed attacks", () => {
    const missedCoordinates = ["A1", "B2", "C3"];

    missedCoordinates.forEach((coord) => {
      gameboard.receiveAttack(coord);
    });

    expect(gameboard.getMissedAttacks()).toEqual(missedCoordinates);
  });

  it("should correctly determine if all ships have been sunk", () => {
    const ship1 = ShipFactory(3);
    const ship2 = ShipFactory(2);
    const ship3 = ShipFactory(4);
    const coordinates1 = ["A1", "A2", "A3"];
    const coordinates2 = ["B1", "B2"];
    const coordinates3 = ["C1", "C2", "C3", "C4"];

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
    const ship1 = ShipFactory(3);
    const ship2 = ShipFactory(2);
    const ship3 = ShipFactory(4);
    const coordinates1 = ["A1", "A2", "A3"];
    const coordinates2 = ["B1", "B2"];
    const coordinates3 = ["C1", "C2", "C3", "C4"];

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
    expect(player.name).toBe("Computer");
  });

  it("should have an attack method", () => {
    expect(typeof player.attack).toBe("function");
  });

  describe("attack method", () => {
    let enemyGameboard;

    beforeEach(() => {
      enemyGameboard = GameboardFactory();
    });

    it("should perform an attack on the enemy Gameboard", () => {
      const ship = ShipFactory(3);
      const coordinates = ["A1", "A2", "A3"];
      enemyGameboard.placeShip(ship, coordinates);

      const initialHits = ship.hits;

      player.attack(enemyGameboard);

      const updatedHits = ship.hits;

      expect(updatedHits).toBeGreaterThan(initialHits);
    });

    it("should not attack the same coordinate twice", () => {
      const ship = ShipFactory(3);
      const coordinates = ["A1", "A2", "A3"];
      enemyGameboard.placeShip(ship, coordinates);

      const attackedCoordinates = new Set();

      for (let i = 0; i < 10; i += 1) {
        player.attack(enemyGameboard);

        const attackedCoordinate =
          enemyGameboard.getMissedAttacks().pop() || "";
        const isUniqueCoordinate = !attackedCoordinates.has(attackedCoordinate);

        expect(isUniqueCoordinate).toBe(true);

        attackedCoordinates.add(attackedCoordinate);
      }
    });

    it("should only attack valid coordinates within the enemy Gameboard", () => {
      const ship = ShipFactory(3);
      const coordinates = ["A1", "A2", "A3"];
      enemyGameboard.placeShip(ship, coordinates);

      for (let i = 0; i < 10; i += 1) {
        player.attack(enemyGameboard);

        const attackedCoordinate =
          enemyGameboard.getMissedAttacks().pop() || "";
        const isValidCoordinate =
          attackedCoordinate.length === 2 &&
          attackedCoordinate[0].match(/[A-J]/) &&
          attackedCoordinate[1].match(/[1-9]|10/);

        expect(isValidCoordinate).toBe(true);
      }
    });
  });
});
