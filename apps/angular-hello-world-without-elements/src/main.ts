import { BrowserModule, createApplication } from '@angular/platform-browser';
import { NgModule, Injector, ComponentFactoryResolver } from '@angular/core';

import { AngularCustomElementsBridge } from './app/angular-elements-bridge';
import { CustomElementsWrapper } from './app/custom-elements-wrapper';
import { appConfig } from './app/app.config';
import 'zone.js';
import { AngularChatComponent } from '@angular-chat';

createApplication(appConfig)
  .then((app) => {
    const factory = app.injector
      .get(ComponentFactoryResolver)
      .resolveComponentFactory(AngularChatComponent);

    const bridge = new AngularCustomElementsBridge(
      app.injector,
      AngularChatComponent,
      factory
    );

    bridge.prepare();
    CustomElementsWrapper.bridge = bridge;

    factory.inputs
      .map(({ propName }) => propName)
      .forEach((property) => {
        Object.defineProperty(CustomElementsWrapper.prototype, property, {
          get: function () {
            return bridge.getInput(property);
          },
          set: function (newValue: any) {
            bridge.setInput(property, newValue);
          },
          configurable: true,
          enumerable: true,
        });
      });

    customElements.define('my-angular-chat-without-lib', CustomElementsWrapper);
  })
  .catch((err) => console.error(err));
