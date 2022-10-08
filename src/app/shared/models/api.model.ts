export interface IApiResponse {
  items: [{
    date_utc: number;
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjclose: number;
  }];
}

export interface IApiModel {
  date: Date;
  close: number;
}
