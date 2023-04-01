import { parsePagination } from "src/utils/api";

describe("offsetLimitToPageSizePageNumber", () => {
    it("should convert limit and offset to size and page", () => {
      const limit = 10;
      const offset = 20;
      const expectedOutput = {
        size: 10,
        page: 3,
      };
      expect(parsePagination(limit, offset)).toEqual(expectedOutput);
    });
  
    it("should handle zero offset", () => {
      const limit = 10;
      const offset = 0;
      const expectedOutput = {
        size: 10,
        page: 1,
      };
      expect(parsePagination(limit, offset)).toEqual(expectedOutput);
    });
  
    it("should handle zero limit", () => {
      const limit = 0;
      const offset = 20;
      expect(() => parsePagination(limit, offset)).toThrowError(
        "Limit should be greater than 0."
      );
    });
  });