import {
  Component,
  OnInit,
} from '@angular/core';
import {
  IApiResponse,
  IMessage,
} from "./models/api.model";
import { webSocket } from "rxjs/webSocket";
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

  private _socket = webSocket<IMessage>('ws://localhost:4300/');
  private _messages: IMessage[] = [];

  public get dataSet(): IApiResponse[] {
    return this._dataSet;
  }

  public get messages(): IMessage[] {
    return this._messages;
  }

  constructor(private readonly _apiService: ApiService) { }

  public ngOnInit(): void {
    this._apiService.get(this._keys).subscribe(data => {
      this._dataSet = [];

      data.map(item => {
        item && this._dataSet.push({
          key: item.key,
          data: item.data,
          name: item.name,
        });
      });
    });

    this._socket.subscribe((data) => this._messages = [...this._messages, data]);
  }

  public sendMessage(data: IMessage) {
    this._socket.next(data);
  }
}
