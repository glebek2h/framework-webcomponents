import { Component } from '@angular/core';
import { AngularChatComponent } from '@angular-chat';

@Component({
  selector: 'app-root',
  template: `<lib-angular-chat messages='[{"id":"1","message":"I like RxJs","sender":"Angular"},{"id":"2","message":"I like JSX","sender":"React"}]'/>`,
  standalone: true,
  imports: [AngularChatComponent],
})
export class AppComponent {
  title = 'angular-app';
}
