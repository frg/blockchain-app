import { parseSortString } from "src/utils/api";

describe('parseSortString', () => {
  it('should parse a valid sort string', () => {
    const sortString = 'desc(last_modified),asc(email)';
    const expectedOutput = [
      {
        field: 'last_modified',
        order: 'desc',
      },
      {
        field: 'email',
        order: 'asc',
      },
    ];
    expect(parseSortString(sortString)).toEqual(expectedOutput);
  });

  it('should throw an error if the order value is not asc or desc', () => {
    const invalidSortString = 'invalid(last_modified),asc(email)';
    expect(() => parseSortString(invalidSortString)).toThrowError(
      "Invalid order value: invalid. Expected 'asc' or 'desc'."
    );
  });

  it('should handle a single field and order', () => {
    const sortString = 'asc(name)';
    const expectedOutput = [
      {
        field: 'name',
        order: 'asc',
      },
    ];
    expect(parseSortString(sortString)).toEqual(expectedOutput);
  });

  it('should handle an empty string input', () => {
    const sortString = '';
    const expectedOutput: any[] = [];
    expect(parseSortString(sortString)).toEqual(expectedOutput);
  });
});