/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IApiModel, IApiResponse } from "../models/api.model";
// import { RAPID_KEY } from "../../../environments/environment";

const BASE_URL = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/';
const BASE_PARAMS = '/1d?diffandsplits=false';
const RAPID_HOST = 'yahoo-finance15.p.rapidapi.com';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  // disabled until database realization

  // public getData(symbol: string): Observable<IApiModel[]> {
  //   return this._httpClient.request<IApiResponse>('get', BASE_URL + symbol + BASE_PARAMS, { headers: this._getHeaders() })
  //     .pipe(
  //       catchError(() => EMPTY),
  //       map(({ items }) => {
  //         return Object.entries(items).filter(details => !!details[1].close).map(details => ({ date: new Date(details[1].date_utc * 1000), close: details[1].close }));
  //       })
  //     )
  // }

  private _getHeaders(): HttpHeaders {
    return new HttpHeaders({
      // 'X-RapidAPI-Key': RAPID_KEY,
      'X-RapidAPI-Host': RAPID_HOST,
    });
  }
}
