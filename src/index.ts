import { parseCsv } from './services/csvServices';

const main = async () => {
    const filename = process.argv[2];
    const insertStatement = await parseCsv(filename);
    console.log({ insertStatement });
};

main();
