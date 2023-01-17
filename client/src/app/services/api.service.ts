import { Injectable } from '@angular/core';
import {
  catchError,
  EMPTY,
  map,
  Observable,
} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IApiResponse, IMessage } from 'src/app/models/api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  public getStocks(keys: string[]): Observable<IApiResponse[]> {
    return this._httpClient.request<{ data: IApiResponse[] }>('get', 'http://127.0.0.1:4300/api/v1/stocks', { params: { keys } })
      .pipe(
        catchError(() => EMPTY),
        map(({ data }) => data),
      );
  }

  public getMessages(): Observable<IMessage[]> {
    return this._httpClient.request<{ data: IMessage[] }>('get', 'http://127.0.0.1:4300/api/v1/messages')
      .pipe(
        catchError(() => EMPTY),
        map(({ data }) => data),
      );
  }
}
