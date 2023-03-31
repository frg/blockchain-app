import { unixTimestampToDateTime } from '../../utils/time';

describe('unixTimestampToDateTime', () => {
  it('should convert a valid unix timestamp to a Date object', () => {
    const timestamp = 1648605600; // March 30, 2022, 00:00:00 UTC
    const expectedDate = new Date('2022-03-30T02:00:00.000Z');
    const result = unixTimestampToDateTime(timestamp);
    expect(result).toEqual(expectedDate);
  });

  it('should convert the unix epoch to a Date object', () => {
    const timestamp = 0; // January 1, 1970, 00:00:00 UTC
    const expectedDate = new Date('1970-01-01T00:00:00.000Z');
    const result = unixTimestampToDateTime(timestamp);
    expect(result).toEqual(expectedDate);
  });

  it('should handle negative unix timestamps', () => {
    const timestamp = -86400; // December 31, 1969, 00:00:00 UTC
    const expectedDate = new Date('1969-12-31T00:00:00.000Z');
    const result = unixTimestampToDateTime(timestamp);
    expect(result).toEqual(expectedDate);
  });
});