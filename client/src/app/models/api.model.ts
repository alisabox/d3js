export interface IApiResponse {
  key: string,
  name: string,
  data: IApiModel[];
}

export interface IApiModel {
  date: Date;
  close: number;
}

export interface IApiFullModel {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjclose: number;
}

export interface IMessage {
  message: string;
  name: string;
  token: string;
}
