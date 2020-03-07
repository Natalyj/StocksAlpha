import { StockInfo, TimeSeries, Interval, PriceField } from './types';
import { requestTimeSeries } from './requestTimeSeries';
import { parseTimeSeries } from './parseTimeSeries';

export const getTimeSeries = async (
  timeSeries: TimeSeries,
  company: string,
  priceField: PriceField,
  interval = Interval.Five
): Promise<StockInfo[]> =>
  await requestTimeSeries(timeSeries, company, interval)
    .then(series => parseTimeSeries(series, priceField));
