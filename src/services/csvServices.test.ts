import { parseCsv, parseLines } from './csvServices';
import { promises as fs } from 'fs';
import { resolve } from 'path';

describe('Unit test - parseLines', () => {
    it('should return the correct array data', async () => {
        const data = await fs.readFile(
            resolve('src', 'mocks', 'sample.csv'),
            'utf-8',
        );
        const lines = data.split('\n');
        const results = parseLines(lines);
        expect(results).toHaveLength(192);
        expect(results[0].nmi).toBe('NEM1201009');
        expect(results[0].timestamp).toBe('2005-03-01 00:30:00');
        expect(results[0].consumption).toBe(0);
        expect(results[191].nmi).toBe('NEM1201009');
        expect(results[191].timestamp).toBe('2005-03-05 00:00:00');
        expect(results[191].consumption).toBe(0.967);
    });
});
