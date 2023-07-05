/* global describe, it, expect, beforeEach */

import { ShipFactory, GameboardFactory } from "../app-logic";

describe("ShipFactory", () => {
  let ship;

  beforeEach(() => {
    ship = ShipFactory(3);
  });

  it("should have the correct length", () => {
    // Incoming query: Asserting the expected output
    expect(ship.length).toBe(3);
  });

  it("should have initial hit count of 0", () => {
    // Incoming query: Asserting the expected output
    expect(ship.isSunk()).toBe(false);
  });

  it("should increase hit count when hit() is called", () => {
    // Incoming command: Asserting the direct public side effect caused by the command
    ship.hit();
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  it("should be considered sunk when hit count equals length", () => {
    // Incoming query: Asserting the expected output
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("GameboardFactory", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = GameboardFactory();
  });

  it("should be able to place ships at specific coordinates", () => {
    const ship = ShipFactory(3);
    gameboard.placeShip(ship, 0, 0, "horizontal");

    // Assert that the ship is placed correctly at the specified coordinates
    expect(gameboard.grid[0][0]).toEqual(ship);
    expect(gameboard.grid[0][1]).toEqual(ship);
    expect(gameboard.grid[0][2]).toEqual(ship);
  });

  it("should record missed shot coordinates when attack misses", () => {
    gameboard.receiveAttack(0, 0);

    // Assert that the missed shot coordinates are recorded
    expect(gameboard.missedAttacks).toContainEqual([0, 0]);
  });

  it("should send 'hit' function to the correct ship when attack hits", () => {
    const ship = ShipFactory(3);
    const placedShip = gameboard.placeShip(ship, 0, 0, "horizontal"); // Assign the returned ship object

    gameboard.receiveAttack(0, 0);

    // Assert that the 'hit' function is sent to the correct ship
    expect(placedShip.hits).toBe(1);
  });

  it("should be able to report whether all ships have been sunk", () => {
    const ship1 = ShipFactory(3);
    const ship2 = ShipFactory(2);

    gameboard.placeShip(ship1, 0, 0, "horizontal");
    gameboard.placeShip(ship2, 1, 0, "vertical");

    // Attack all the positions of the ships
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);

    // Assert that all ships are reported as sunk
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
