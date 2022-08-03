import { FC } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { LineData, WhitespaceData } from 'lightweight-charts';
import Container from '@material-ui/core/Container';

import fn3 from 'data/equity-curve/qarbon-fn3.json';
import fn3v2 from 'data/equity-curve/qarbon-fn3v2.json';
import mm3 from 'data/equity-curve/qarbon-mm3.json';
import mm3v2 from 'data/equity-curve/qarbon-mm3v2.json';
import tt1 from 'data/equity-curve/qarbon-tt1.json';
import tt1v2 from 'data/equity-curve/qarbon-tt1v2.json';
import tt3 from 'data/equity-curve/qarbon-tt3.json';
import tt4 from 'data/equity-curve/qarbon-tt4.json';
import tt4v2 from 'data/equity-curve/qarbon-tt4v2.json';
import EquityCurve from 'components/widgets/equity-curve/EquityCurve';

type Props = {
  data: Array<Record<string, number>>;
};

const botMap: Record<string, Record<string, Array<LineData | WhitespaceData>>> = {
  'qarbon-fn3': fn3,
  'qarbon-fn3v2': fn3v2,
  'qarbon-mm3': mm3,
  'qarbon-mm3v2': mm3v2,
  'qarbon-tt1': tt1,
  'qarbon-tt1v2': tt1v2,
  'qarbon-tt3': tt3,
  'qarbon-tt4': tt4,
  'qarbon-tt4v2': tt4v2
};

const botNameMap: Record<string, string> = {
  'qarbon-fn3': 'FN3',
  'qarbon-fn3v2': 'FN3v2',
  'qarbon-mm3': 'MM3',
  'qarbon-mm3v2': 'MM3v2',
  'qarbon-tt1': 'TT1',
  'qarbon-tt1v2': 'TT1v2',
  'qarbon-tt3': 'TT3',
  'qarbon-tt4': 'TT4',
  'qarbon-tt4v2': 'TT4v2'
};

const WidgetPage: FC<Props> = () => {
  const { id } = useParams<{ id: string }>();

  if (!Object.keys(botMap).includes(id)) {
    return <Redirect to="/" />;
  }

  const displayUpToSpecificDate = (botId: string) => ['qarbon-tt4', 'qarbon-mm3v2', 'qarbon-tt1v2'].includes(botId);

  return (
    <Container key={id} maxWidth="lg" className="py-1">
      {!displayUpToSpecificDate(id) && <EquityCurve data={botMap[id].equityCurve} name={botNameMap[id]} />}
      {displayUpToSpecificDate(id) && (
        <EquityCurve
          data={botMap[id].equityCurve.filter(item => {
            const epoch = new Date(item.time as string).valueOf();
            return epoch < 1659315600000; // 2022-08-01 UTC 1:00:00 AM
          })}
          name={botNameMap[id]}
        />
      )}
    </Container>
  );
};

export default WidgetPage;
