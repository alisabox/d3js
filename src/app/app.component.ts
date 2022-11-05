import {
  Component,
  OnInit,
} from '@angular/core';
import { ApiService } from "./shared/services/api.service";
import { IDataSet } from "./shared/models/api.model";
import { dataTesla, dataApple, dataGoogle, dataMS } from "./shared/services/data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _dataSet: IDataSet[] = [
    { symbol: 'TSLA', data: dataTesla, name: 'Tesla' },
    { symbol: 'AAPL', data: dataApple, name: 'Apple' },
    { symbol: 'MSFT', data: dataMS, name: 'Microsoft' },
    { symbol: 'GOOG', data: dataGoogle, name: 'Google' },
  ];

  public get dataSet(): IDataSet[] {
    return this._dataSet;
  }

  constructor(private readonly _apiService: ApiService) { }

  public ngOnInit(): void {
    // this._dataSet.map(item => {
    //   this._apiService.getData(item.symbol).subscribe(data => {
    //     item.data = data;
    //   });
    // });
  }
}
