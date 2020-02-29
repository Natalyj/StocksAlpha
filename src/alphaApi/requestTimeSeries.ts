import { QUERY_START, APIKEY_QUERY } from "./constants";
import { Interval, TimeSeries } from "./types";
import { isIntervalFunction, requestJson } from "./utils";

export const requestTimeSeries = async (
	timeSeries: TimeSeries,
	company: string,
	interval = Interval.Five
): Promise<any> => {
	const intervalQuery = isIntervalFunction(timeSeries) ? `&interval=${interval}` : '';
	const requestQuery = `${QUERY_START}function=${timeSeries}&symbol=${company}${intervalQuery}&${APIKEY_QUERY}`;

	return await requestJson(requestQuery);
};
