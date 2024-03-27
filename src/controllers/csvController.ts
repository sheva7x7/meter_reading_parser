import moment from 'moment';

export const processIntervalData = (
    columns: string[],
    nmi?: string,
    interval?: number,
) => {
    if (!nmi || !interval || !columns.length) {
        return [];
    }
    const results: [string, string, number][] = [];
    const intervalLength = (60 * 24) / interval;
    const intervalDate = columns[1];
    for (let i = 2; i < 2 + intervalLength; i++) {
        results.push([
            nmi,
            parseTimezone(intervalDate, interval, i - 2),
            +columns[i],
        ]);
    }
    return results;
};

export const parseTimezone = (
    date: string,
    interval: number,
    index: number,
) => {
    const minOfDay = interval * index;
    const minute = minOfDay % 60;
    const hour = Math.floor(minOfDay / 60);
    const dateString = `${date} ${hour >= 10 ? hour : '0' + hour}:${minute}:00`;
    const modifiedDateTime = moment(dateString, 'YYYYMMDD HH:mm:ss').add(
        interval,
        'minutes',
    );
    return modifiedDateTime.format('YYYY-MM-DD HH:mm:ss');
};
