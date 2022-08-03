import { FC, useEffect, useRef, useState } from 'react';
import { BusinessDay, createChart, IChartApi, LineData, MouseEventParams, WhitespaceData } from 'lightweight-charts';
import { fromUnixTime, format, toDate } from 'date-fns';
import throttle from 'lodash/throttle';
import { useTheme } from '@material-ui/core';
import clsx from 'clsx';

import useWindowSize from 'hooks/useWindowSize';

type Props = {
  data: Array<LineData | WhitespaceData>;
  name: string;
};

const height = 500;

const Chart: FC<Props> = ({ data, name }) => {
  const [timestamp, setTimestamp] = useState<string | number>('');
  const [equity, setEquity] = useState('');

  const widget = useRef<HTMLDivElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi>();

  const { width } = useWindowSize();
  const {
    breakpoints: {
      values: { lg, sm }
    },
    spacing
  } = useTheme();

  const calculateWidth = (w = window.innerWidth) => {
    if (w > lg) {
      return lg - spacing(6);
    }

    if (w < sm) {
      return w - spacing(4);
    }

    return w - spacing(6);
  };

  useEffect(() => {
    if (widget.current) {
      if (widget.current.children[0]) {
        widget.current.removeChild(widget.current.children[0]);
      }

      chart.current = createChart(widget.current, {
        width: calculateWidth(width),
        height,
        rightPriceScale: {
          borderVisible: false
        },
        timeScale: {
          borderVisible: false
        },
        layout: {
          backgroundColor: '#fff',
          textColor: '#191919'
        },
        grid: {
          vertLines: {
            visible: false
          },
          horzLines: {
            color: '#f0f3fa'
          }
        }
      });

      const areaSeries = chart.current.addAreaSeries({
        topColor: 'rgba(30, 182, 169, 1)',
        bottomColor: 'rgba(30, 182, 169, 0)',
        lineColor: '#2d4150',
        lineWidth: 2,
        priceFormat: {
          type: 'custom',
          formatter: (price: number) => `${(price * 100).toFixed(0)}%`
        }
      });

      areaSeries.setData(data);
      chart.current.timeScale().fitContent();

      const subscribeCrosshairMoveCallback = (param: MouseEventParams) => {
        const value = param.seriesPrices.get(areaSeries);
        const { time } = param;

        if (!time || typeof value !== 'number') {
          setEquity('');
          return;
        }

        setEquity(`${(value * 100).toFixed(0)}%`);

        let dateStr;

        if (typeof time === 'number') {
          dateStr = format(fromUnixTime(time), 'MMMM dd, Y hh:mm aa');
        } else if (time) {
          const { year, month, day } = time as BusinessDay;
          dateStr = format(toDate(new Date(year, month - 1, day)), 'Y-MM-dd');
        }

        if (dateStr) {
          setTimestamp(dateStr);
        }

        const container = widget.current;
        const { current } = tooltip;

        if (!container || !current) {
          return;
        }

        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > container.clientWidth ||
          param.point.y < 0 ||
          param.point.y > container.clientHeight
        ) {
          setEquity('');
          return;
        }

        const coordinate = areaSeries.priceToCoordinate(value);
        const { x, y } = param.point;
        const currentWidth = window.innerWidth;

        if (coordinate === null) {
          return;
        }

        let left = +x;
        let top = +y;

        if (currentWidth > lg) {
          left += (currentWidth - lg) / 2;
        }

        if (y < 46) {
          top = 46;
        } else if (y > 424) {
          top = 424;
        }

        if (x > calculateWidth(currentWidth) - 156) {
          left -= 112;
        } else {
          left += 48;
        }

        current.style.left = `${left}px`;
        current.style.top = `${top}px`;
      };

      chart.current.subscribeCrosshairMove(subscribeCrosshairMoveCallback);
    }
  }, [widget, data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleWindowResize = throttle(() => {
    if (chart.current && width) {
      chart.current.resize(calculateWidth(width), height);
    }
  }, 300);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleWindowResize, [width]);

  return (
    <div>
      <div ref={widget} />
      <div
        ref={tooltip}
        className={clsx(
          !equity && 'hidden',
          'absolute z-20 border border-solid border-primary rounded-sm h-24 w-28 pointer-events-none bg-white pt-2 pl-4 text-md'
        )}
      >
        <div className="text-primary font-roboto font-bold">{name}</div>
        <div className="text-2xl">{equity}</div>
        <div className="text-sm">{timestamp}</div>
      </div>
    </div>
  );
};

export default Chart;
