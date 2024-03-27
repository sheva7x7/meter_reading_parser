import { promises as fs } from 'fs';
import { processIntervalData } from '../controllers/csvController';
import { Record } from '../types/records';
import pgp from 'pg-promise';

const { insert } = pgp().helpers;
const COLUMNS = ['nmi', 'timestamp', 'consumption'];
const TABLE_NAME = 'meter_readings';

export const parseLines = (lines: string[]) => {
    let results: Map<string, Record> = new Map();
    let currNMI;
    let currInterval;
    for (const line of lines) {
        const columns = line.split(',');
        const recordIndicator = columns[0];
        switch (recordIndicator) {
            case '200':
                currNMI = columns[1];
                currInterval = +columns[8];
                break;
            case '300':
                const records = processIntervalData(
                    columns,
                    currNMI,
                    currInterval,
                );
                for (const record of records) {
                    const key = `${record[0]}_${record[1]}`;
                    if (results.has(key)) {
                        const prev = results.get(key) as Record;
                        prev.consumption = parseFloat(
                            (prev.consumption + record[2]).toFixed(10),
                        );
                        results.set(key, prev);
                    } else {
                        results.set(key, {
                            nmi: record[0],
                            timestamp: record[1],
                            consumption: +record[2],
                        });
                    }
                }
                break;
            default:
                break;
        }
    }
    return Array.from(results.values());
};

export const parseCsv = async (filename: string) => {
    const data = await fs.readFile(filename, 'utf-8');
    const lines = data.split('\n');
    const results = parseLines(lines);
    const insertStatement = insert(results, COLUMNS, TABLE_NAME);
    return insertStatement;
};
