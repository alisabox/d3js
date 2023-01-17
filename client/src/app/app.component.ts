import {
  Component,
  OnInit,
} from '@angular/core';
import { IApiResponse } from "./models/api.model";
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private _keys = ['TSLA', 'AAPL', 'MSFT', 'GOOG'];
  private _dataSet: IApiResponse[] = [
    { key: 'TSLA', data: [], name: 'Tesla' },
    { key: 'AAPL', data: [], name: 'Apple' },
    { key: 'MSFT', data: [], name: 'Microsoft' },
    { key: 'GOOG', data: [], name: 'Google' },
  ];

  public get dataSet(): IApiResponse[] {
    return this._dataSet;
  }

  constructor(private readonly _apiService: ApiService) { }

  public ngOnInit(): void {
    this._apiService.getStocks(this._keys).subscribe(data => {
      this._dataSet = [];

      data.map(item => {
        item && this._dataSet.push({
          key: item.key,
          data: item.data,
          name: item.name,
        });
      });
    });
  }
}
