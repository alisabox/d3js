import {
  Component,
  OnInit,
} from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { FormControl } from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';
import { IMessage } from "../../models/api.model";

const PROD_URL = 'd3js-theta.vercel.app';
const DEVELOP_URL = '127.0.0.1:4300';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  private _socket = webSocket<IMessage>(`ws://${PROD_URL}/`);
  private _messages: IMessage[] = [];

  public nameFormControl = new FormControl('', []);
  public commentFormControl = new FormControl('', []);

  public get messages(): IMessage[] {
    return this._messages;
  }

  constructor(private readonly _apiService: ApiService) { }

  public ngOnInit(): void {
    this._apiService.getMessages().subscribe((messages) => {
      this._messages = messages;
    });

    this._socket.subscribe((data) => this._messages.push(data));
  }

  public sendMessage(message: string, name: string): void {
    if (!message.length || !name.length) {
      return;
    }

    const token = 'token';

    this._socket.next({ senderId: '63a5ccc2662547581593c5fc', content: message, senderName: name, token });
    this.commentFormControl.reset(null);
    this.nameFormControl.disable();
  }
}
