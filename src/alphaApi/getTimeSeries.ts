import { StockInfo, TimeSeries, Interval, PriceField } from './types';
import {
  isIntervalFunction,
  requestJson,
  getTimeZone,
  getCurrentDate,
  getFieldValue,
} from './utils';
import { QUERY_START, APIKEY_QUERY } from './constants';

export const getTimeSeries = async (
  timeSeries: TimeSeries,
  company: string,
  priceField: PriceField,
  interval = Interval.Five
): Promise<StockInfo[]> =>
  await requestTimeSeries(timeSeries, company, interval).then(series =>
    parseTimeSeries(series, priceField)
  );

const requestTimeSeries = async (
  timeSeries: TimeSeries,
  company: string,
  interval: Interval
): Promise<any> => {
  const intervalQuery = isIntervalFunction(timeSeries)
    ? `&interval=${interval}`
    : '';
  const requestQuery = `${QUERY_START}function=${timeSeries}&symbol=${company}${intervalQuery}&${APIKEY_QUERY}`;

  return await requestJson(requestQuery);
};

const parseTimeSeries = (
  responseJson: any,
  priceField: PriceField
): Array<StockInfo> => {
  const entries: [string, any][] = Object.entries(responseJson);
  const timeZone = getTimeZone(entries[0][1]);
  const timeSeriesEntries: [string, any][] = Object.entries(entries[1][1]);

  const prices: Array<StockInfo> = [];

  for (const [date, values] of timeSeriesEntries) {
    prices.push({
      date: getCurrentDate(date, timeZone),
      price: Number(getFieldValue(values, priceField)),
    });
  }

  return prices;
};
