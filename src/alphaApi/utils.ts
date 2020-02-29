import { APIFunction, TimeSeries } from "./types";

export const requestJson = async (query: string): Promise<any> => {
  const response = await fetch(query);
  return await response.json();
};

export const isIntervalFunction = (fn: APIFunction): boolean => {
  return fn === TimeSeries.Intraday;
};
