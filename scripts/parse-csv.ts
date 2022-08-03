import fs from 'fs';
import path from 'path';

import parse from 'csv-parse/lib/sync';
import { parseJSON, getUnixTime } from 'date-fns';

const executeParse = async (file: string) => {
  const content = await fs.promises.readFile(`${path.resolve(__dirname, '../')}/public/data/${file}.csv`);

  const records = parse(content, { fromLine: 2 });

  const json = records.map((record: any) => {
    let time = getUnixTime(parseJSON(record[0]));

    if (!time) {
      [time] = record;
    }

    return {
      time,
      value: record[1]
    };
  });

  fs.promises.writeFile(
    `${path.resolve(__dirname, '../')}/src/data/equity-curve/${file}.json`,
    JSON.stringify({ equityCurve: json })
  );
};

const filenames = [
  'qarbon-fn3',
  'qarbon-fn3v2',
  'qarbon-mm3',
  'qarbon-mm3v2',
  'qarbon-tt1',
  'qarbon-tt1v2',
  'qarbon-tt3',
  'qarbon-tt4',
  'qarbon-tt4v2'
];

filenames.forEach(file => {
  executeParse(file);
});
