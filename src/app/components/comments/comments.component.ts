import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl } from "@angular/forms";
import {IMessage} from "../../shared/models/api.model";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
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

    this.sendMessageEvent.emit({ message, name });
    this.commentFormControl.reset(null);
    this.nameFormControl.disable();
  }
}
