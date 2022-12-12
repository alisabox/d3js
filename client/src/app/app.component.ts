import {
  Component,
  OnInit,
} from '@angular/core';
import { ApiService } from "./shared/services/api.service";
import {
  IDataSet,
  IMessage,
} from "./shared/models/api.model";
import { dataTesla, dataApple, dataGoogle, dataMS } from "./shared/services/data";
import { webSocket } from "rxjs/webSocket";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private _dataSet: IDataSet[] = [
    { symbol: 'TSLA', data: dataTesla, name: 'Tesla' },
    { symbol: 'AAPL', data: dataApple, name: 'Apple' },
    { symbol: 'MSFT', data: dataMS, name: 'Microsoft' },
    { symbol: 'GOOG', data: dataGoogle, name: 'Google' },
  ];

  private _socket = webSocket<IMessage>('ws://localhost:4300/');
  private _messages: IMessage[] = [];

  public get dataSet(): IDataSet[] {
    return this._dataSet;
  }

  public get messages(): IMessage[] {
    return this._messages;
  }

  constructor(private readonly _apiService: ApiService) { }

  public ngOnInit(): void {
    // this._dataSet.map(item => {
    //   this._apiService.getData(item.symbol).subscribe(data => {
    //     item.data = data;
    //   });
    // });

    this._socket.subscribe((data) => this._messages = [...this._messages, data]);
  }

  public sendMessage(data: IMessage) {
    this._socket.next(data);
  }
}
