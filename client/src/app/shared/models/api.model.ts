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

export interface IDataSet {
  symbol: string,
  data: IApiModel[],
  name: string,
}

export interface IMessage {
  message: string;
  name: string;
  token: string;
}
