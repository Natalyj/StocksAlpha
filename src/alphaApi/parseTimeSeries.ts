import { getTimeZone, getFieldValue, getCurrentDate } from './utils';
import { StockInfo, PriceField } from './types';

export const parseTimeSeries = (
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
