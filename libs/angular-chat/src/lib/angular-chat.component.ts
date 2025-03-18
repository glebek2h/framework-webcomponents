import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const SENDER = 'Angular';

@Component({
  selector: 'lib-angular-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './angular-chat.component.html',
  styleUrl: './angular-chat.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AngularChatComponent {
  private _messages = [];
  @Input() set messages(value: any) {
    if (typeof value == 'string') {
      this._messages = JSON.parse(value);
    } else {
      this._messages = value;
    }
  }
  get messages() {
    return this._messages;
  }
  @Output() messageSent = new EventEmitter();

  inputValue = '';

  ngOnInit() {}

  // Отправка сообщения
  sendMessage() {
    if (this.inputValue.trim() !== '') {
      const newMessage = {
        id: `msg-${Date.now()}`,
        message: this.inputValue,
        sender: SENDER,
      };
      this.messages.push(newMessage);
      this.messageSent.emit(newMessage);
      this.inputValue = '';
    }
  }
}
