export enum Interval {
	One = '1min',
	Five = '5min',
	Fifteen = '15min',
	Thirty = '30min',
	Sixty = '60min',
}

export enum TimeSeries {
	Intraday = 'TIME_SERIES_INTRADAY',
	Daily = 'TIME_SERIES_DAILY',
	Daily_Adjusted = 'TIME_SERIES_DAILY_ADJUSTED',
	Weekly = 'TIME_SERIES_WEEKLY',
	Weekly_Adjusted = 'TIME_SERIES_WEEKLY_ADJUSTED',
	Monthly = 'TIME_SERIES_MONTHLY',
	Monthly_Adjusted = 'TIME_SERIES_MONTHLY_ADJUSTED'
}

export type APIFunction = TimeSeries;
