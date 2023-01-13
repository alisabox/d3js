import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from "@angular/forms";
import { IMessage } from "../../models/api.model";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  public nameFormControl = new FormControl('', []);
  public commentFormControl = new FormControl('', []);

  @Input()
  public messages: IMessage[] = [];

  @Output()
  public sendMessageEvent = new EventEmitter();

  public sendMessage(message: string, name: string): void {
    if (!message.length || !name.length) {
      return;
    }

    const token = 'token';

    this.sendMessageEvent.emit({ senderId: '63a5ccc2662547581593c5fc', content: message, senderName: name, token });
    this.commentFormControl.reset(null);
    this.nameFormControl.disable();
  }
}
