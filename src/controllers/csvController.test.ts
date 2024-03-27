import { parseTimezone, processIntervalData } from './csvController';
import { mockedColumns } from '../mocks/mocks';

describe('Unit test - processIntervalData', () => {
    it('should return empty array when any of the parameters are invalid', () => {
        expect(processIntervalData(mockedColumns, undefined, 30)).toHaveLength(
            0,
        );
        expect(processIntervalData(mockedColumns, 'NEM1201009')).toHaveLength(
            0,
        );
        expect(processIntervalData([], 'NEM1201009', 30)).toHaveLength(0);
    });
    it('should return the correct array result', () => {
        const result = processIntervalData(mockedColumns, 'NEM1201009', 30);
        expect(result).toHaveLength(48);
        expect(result[0][0]).toBe('NEM1201009');
        expect(result[47][0]).toBe('NEM1201009');
        expect(result[0][1]).toBe('2005-03-01 00:30:00');
        expect(result[47][1]).toBe('2005-03-02 00:00:00');
        expect(result[0][2]).toBe(0);
        expect(result[47][2]).toBe(0.231);
    });
});

describe('Unit test - parseTimezone', () => {
    it('should return correct datetime with YYYY-MM-DD HH:mm:ss format', () => {
        expect(parseTimezone('20050301', 30, 0)).toBe('2005-03-01 00:30:00');
        expect(parseTimezone('20050301', 30, 10)).toBe('2005-03-01 05:30:00');
        expect(parseTimezone('20050301', 30, 47)).toBe('2005-03-02 00:00:00');
        expect(parseTimezone('20050301', 60, 0)).toBe('2005-03-01 01:00:00');
        expect(parseTimezone('20050301', 60, 10)).toBe('2005-03-01 11:00:00');
        expect(parseTimezone('20050301', 60, 23)).toBe('2005-03-02 00:00:00');
        expect(parseTimezone('20050301', 5, 0)).toBe('2005-03-01 00:05:00');
        expect(parseTimezone('20050301', 5, 10)).toBe('2005-03-01 00:55:00');
        expect(parseTimezone('20050301', 5, 287)).toBe('2005-03-02 00:00:00');
    });
});
