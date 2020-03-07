import moment from 'moment-timezone';
import { APIFunction, TimeSeries, APIField, InfoField } from './types';
import { DEFAULT_TIME_ZONE } from './constants';

export const requestJson = async (query: string): Promise<any> => {
  const response = await fetch(query);
  return await response.json();
};

export const isIntervalFunction = (fn: APIFunction): boolean =>
  fn === TimeSeries.Intraday;

export const getFieldValue = (object: any, fieldPart: APIField): any => {
  const field = Object.keys(object).find(key => key.includes(fieldPart));
  return field !== undefined ? object[field] : undefined;
};

export const getTimeZone = (metaObject: any): string =>
  getFieldValue(metaObject, InfoField.TIME_ZONE) ?? DEFAULT_TIME_ZONE;

export const getCurrentDate = (date: string, timeZone: string): Date =>
  moment.tz(date, timeZone).toDate();
