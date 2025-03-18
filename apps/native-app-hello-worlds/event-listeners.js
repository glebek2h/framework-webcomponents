document.addEventListener('DOMContentLoaded', function () {
    const textArea = document.querySelector('#data');
    textArea.value = '[{"id":"1","message":"I like RxJs","sender":"Angular"},{"id":"2","message":"I like JSX","sender":"React"}]';
    const reactChat = document.querySelector('my-react-chat-without-lib');
    const angularChat = document.querySelector('my-angular-chat-without-lib');

    function syncChatsWithTextArea() {
      reactChat.setAttribute(
        'messages',
        JSON.stringify(JSON.parse(textArea.value))
      );
      reactChat.messages = JSON.stringify(JSON.parse(textArea.value));
      angularChat.setAttribute(
        'messages',
        JSON.stringify(JSON.parse(textArea.value))
      );
    }

    function handleNewMessage({ detail: newMessage }) {
      const textAreaValue = JSON.parse(textArea.value);
      textArea.value = JSON.stringify([
        ...(textAreaValue ?? []),
        newMessage,
      ]);
      syncChatsWithTextArea();
    }

    syncChatsWithTextArea();

    document.addEventListener('messageSent', handleNewMessage);

    angularChat.addEventListener('messageSent', handleNewMessage);
});