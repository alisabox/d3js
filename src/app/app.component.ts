import {
  Component,
  OnInit,
} from '@angular/core';
import { ApiService } from "./shared/services/api.service";
import { IApiModel } from "./shared/models/api.model";
import { data } from "./shared/services/data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _symbol: string = 'TSLA';
  private _data: IApiModel[] = [];

  public get data(): IApiModel[] {
    return this._data;
  }

  constructor(private readonly _apiService: ApiService) { }

  public ngOnInit(): void {
    // this._apiService.getData(this._symbol).subscribe(data => {
    //   this.data = data;
    // });

    // @FIXME to remove
    this._data = data;
  }
}
