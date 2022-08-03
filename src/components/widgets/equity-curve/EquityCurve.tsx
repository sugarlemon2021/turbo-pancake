import { FC, useState, useEffect } from 'react';
import { LineData, WhitespaceData } from 'lightweight-charts';
import { format, fromUnixTime, isAfter, isBefore, sub } from 'date-fns';
import { DatePicker } from '@material-ui/pickers';
import { useParams } from 'react-router-dom';
import GetAppIcon from '@material-ui/icons/GetApp';

import Button from 'components/controls/Button';
import SplitButton from 'components/controls/SplitButton';
import Chart from 'components/widgets/equity-curve/Chart';
import useMuiBreakpoints from 'hooks/useMuiBreakpoints';

type Props = {
  data: Array<LineData | WhitespaceData>;
  name: string;
};

const timeAgo =
  (duration: Record<string, number>) =>
  ({ time }: LineData | WhitespaceData) => {
    let dateToCheck: Date;

    if (typeof time === 'number') {
      dateToCheck = fromUnixTime(time);
    } else {
      const [year, month, day] = `${time}`.split('-');
      dateToCheck = new Date(+year, +month - 1, +day + 1);
    }

    return isBefore(sub(new Date(), duration), dateToCheck);
  };

const afterDate =
  (date: Date) =>
  ({ time }: LineData | WhitespaceData) => {
    let dateToCheck: Date;

    if (typeof time === 'number') {
      dateToCheck = fromUnixTime(time);
    } else {
      const [year, month, day] = `${time}`.split('-');
      dateToCheck = new Date(+year, +month - 1, +day);
    }

    return isAfter(dateToCheck, sub(date, { days: 1 }));
  };

// @ts-expect-error NOTE: improve typings
const modifyValues = ({ time, value }: LineData | WhitespaceData, _: number, data: Props['data']) => ({
  time,
  // @ts-expect-error NOTE: improve typings
  value: value / data[0].value
});

const filterOptions = ['ALL TIME', 'YTD', '1Y', '6M', '3M', '1M'];

const filterOptionsMap: Record<string, any> = {
  'ALL TIME': Boolean,
  YTD: afterDate(new Date(new Date().getFullYear(), 0, 1)),
  '1Y': timeAgo({ years: 1 }),
  '6M': timeAgo({ months: 6 }),
  '3M': timeAgo({ months: 3 }),
  '1M': timeAgo({ months: 1 })
};

const EquityCurve: FC<Props> = ({ data, name }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredData, setFilteredData] = useState(data.filter(filterOptionsMap[filterOptions[selectedIndex]]));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, toggleOpen] = useState(false);

  const { smallAndUp, mediumAndUp } = useMuiBreakpoints();

  const { id } = useParams<{ id: string }>();

  const handleSelectCustomDate = (date: Date | null) => {
    setSelectedDate(date);

    if (date) {
      setFilteredData(data.filter(afterDate(date)));
      toggleOpen(false);
    }
  };

  useEffect(() => {
    if (!selectedDate) {
      setFilteredData(data.filter(filterOptionsMap[filterOptions[selectedIndex]]));
    }
  }, [data, selectedIndex, selectedDate]);

  return (
    <>
      <div className="flex xs:justify-between">
        <DatePicker
          value={selectedDate}
          onChange={handleSelectCustomDate}
          onClose={() => toggleOpen(false)}
          maxDate={new Date(`${filteredData[filteredData.length - 1].time}`)}
          open={open}
          autoOk
          className="hidden"
        />

        {!smallAndUp && (
          <SplitButton
            ariaLabel="select filter"
            indexState={[selectedIndex, setSelectedIndex]}
            setSelectedDate={setSelectedDate}
            options={filterOptions}
          />
        )}

        {smallAndUp &&
          filterOptions.map((option, index) => (
            <Button
              key={`${option}`}
              primary
              lg
              disableElevation
              variant={selectedIndex === index && selectedDate === null ? 'contained' : 'text'}
              className="md:px-6 sm:px-4 sm:min-w-0"
              onClick={() => {
                setSelectedIndex(index);
                setSelectedDate(null);
              }}
            >
              {option}
            </Button>
          ))}

        <div className="sm:flex-1">
          <Button
            primary
            lg
            variant={selectedDate === null ? 'text' : 'contained'}
            disableElevation
            className="md:px-6 sm:px-4 xs:px-2"
            onClick={() => toggleOpen(true)}
          >
            {selectedDate ? format(selectedDate, 'MMM dd, Y') : 'Custom'}
          </Button>
        </div>

        <Button
          primary
          lg
          variant={mediumAndUp ? 'contained' : 'text'}
          href={`/data/${id}.csv`}
          className="md:px-6 xs:px-2 xs:min-w-0"
        >
          {(mediumAndUp && `Download Data`) || <GetAppIcon />}
        </Button>
      </div>

      <Chart data={filteredData.map(modifyValues)} name={name} />
    </>
  );
};

export default EquityCurve;
