// import { StrictMode } from 'react';
// import * as ReactDOM from 'react-dom/client';
// import App from './app/app';
//
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
//
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client'; // if using React 18

import r2wc from 'react-to-webcomponent';
import { ReactChat } from '@react-chat';

const WebGreeting = r2wc(ReactChat, React, ReactDOM, {
  props: {
    messages: 'json',
  },
});

customElements.define('my-react-chat', WebGreeting);
