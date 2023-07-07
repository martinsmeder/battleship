/* global describe, it, expect */

import FactoryUtils from "../utils";

describe("FactoryUtils", () => {
  describe("convertToIndices", () => {
    it("should convert alphanumeric coordinate to indices", () => {
      const coordinate = "A1";
      const expectedIndices = [0, 0];

      expect(FactoryUtils.convertToIndices(coordinate)).toEqual(
        expectedIndices
      );
    });

    it("should convert alphanumeric coordinate to indices for different coordinates", () => {
      const coordinate = "D7";
      const expectedIndices = [6, 3];

      expect(FactoryUtils.convertToIndices(coordinate)).toEqual(
        expectedIndices
      );
    });
  });

  describe("convertToAlphanumeric", () => {
    it("should convert indices to alphanumeric coordinate", () => {
      const indices = [2, 1];
      const expectedCoordinate = "B3";

      expect(FactoryUtils.convertToAlphanumeric(indices)).toEqual(
        expectedCoordinate
      );
    });

    it("should convert indices to alphanumeric coordinate for different indices", () => {
      const indices = [4, 2];
      const expectedCoordinate = "C5";

      expect(FactoryUtils.convertToAlphanumeric(indices)).toEqual(
        expectedCoordinate
      );
    });
  });
});
