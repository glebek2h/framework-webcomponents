import { reactToWebComponent } from './app/react-to-webcomponent';
import { ReactChat } from '@react-chat';

const reactChat = reactToWebComponent(ReactChat, {
  props: {
    messages: 'json',
  },
});

customElements.define('my-react-chat-without-lib', reactChat);
