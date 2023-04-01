import { parsePagination } from "src/utils/api";

describe('offsetLimitToPageSizePageNumber', () => {
    it('should convert limit and offset to pageSize and pageNumber', () => {
      const limit = 10;
      const offset = 20;
      const expectedOutput = {
        pageSize: 10,
        pageNumber: 3,
      };
      expect(parsePagination(limit, offset)).toEqual(expectedOutput);
    });
  
    it('should handle zero offset', () => {
      const limit = 10;
      const offset = 0;
      const expectedOutput = {
        pageSize: 10,
        pageNumber: 1,
      };
      expect(parsePagination(limit, offset)).toEqual(expectedOutput);
    });
  
    it('should handle zero limit', () => {
      const limit = 0;
      const offset = 20;
      expect(() => parsePagination(limit, offset)).toThrowError(
        'Limit should be greater than 0.'
      );
    });
  });