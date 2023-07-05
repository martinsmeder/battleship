/* global describe, test, expect */

import addNumbers from "../app-logic";

describe("addNumbers", () => {
  test("adds two numbers correctly", () => {
    expect(addNumbers(2, 3)).toBe(5);
  });

  test("returns zero when adding zero to a number", () => {
    expect(addNumbers(7, 0)).toBe(7);
  });
});
