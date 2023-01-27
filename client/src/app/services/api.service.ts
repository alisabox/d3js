import { Injectable } from '@angular/core';
import {
  catchError,
  EMPTY,
  map,
  Observable,
} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IApiResponse, IMessage } from 'src/app/models/api.model';

const PROD_URL = 'https://d3js-theta.vercel.app';
const DEVELOP_URL = 'http://127.0.0.1:4300';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  public getStocks(keys: string[]): Observable<IApiResponse[]> {
    return this._httpClient.request<{ data: IApiResponse[] }>('get', PROD_URL + '/api/v1/stocks', {
      params: { keys },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .pipe(
        catchError(() => EMPTY),
        map(({ data }) => data),
      );
  }

  public getMessages(): Observable<IMessage[]> {
    return this._httpClient.request<{ data: IMessage[] }>('get', PROD_URL + '/api/v1/messages')
      .pipe(
        catchError(() => EMPTY),
        map(({ data }) => data),
      );
  }
}
