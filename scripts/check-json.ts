import differenceInDays from 'date-fns/differenceInDays';

import fn3 from '../src/data/equity-curve/qarbon-fn3.json';
import mm3 from '../src/data/equity-curve/qarbon-mm3.json';
import tt1 from '../src/data/equity-curve/qarbon-tt1.json';
import tt3 from '../src/data/equity-curve/qarbon-tt3.json';
import tt4 from '../src/data/equity-curve/qarbon-tt4.json';

type JSONData = typeof fn3;

const botDataMap: Record<string, any> = {
  'qarbon-fn3': fn3,
  'qarbon-mm3': mm3,
  'qarbon-tt1': tt1,
  'qarbon-tt3': tt3,
  'qarbon-tt4': tt4
};

const executeCheck = (jsonData: JSONData, botName: string) => {
  const len = jsonData.equityCurve.length;
  const date = new Date(jsonData.equityCurve[len - 1].time);

  const diff = differenceInDays(new Date(), date);

  // eslint-disable-next-line no-console
  console.log(`${botName}: ${JSON.stringify(jsonData.equityCurve[len - 1])}`);

  if (diff > 1) {
    throw new Error(`JSON data for ${botName} is not latest`);
  }
};

Object.keys(botDataMap).forEach(key => {
  executeCheck(botDataMap[key], key);
});
