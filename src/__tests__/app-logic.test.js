/* global describe, it, expect, beforeEach */

import { ShipFactory, GameboardFactory } from "../app-logic";

describe("ShipFactory", () => {
  const ship = ShipFactory(3);

  it("should create a ship object with the correct length", () => {
    expect(ship.length).toBe(3);
  });

  it("should create a ship object with initial hits count of 0", () => {
    expect(ship.hits).toBe(0);
  });

  it("hit() method should increase the hits count", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it("isSunk() method should return false when hits count is less than length", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  it("isSunk() method should return true when hits count equals length", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
