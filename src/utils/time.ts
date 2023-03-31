import { UnixTimestampToDateTime } from '../../types/utils/time';

export const unixTimestampToDateTime: UnixTimestampToDateTime = (timestamp) => {
    const milliseconds = timestamp * 1000
    return new Date(milliseconds);
};