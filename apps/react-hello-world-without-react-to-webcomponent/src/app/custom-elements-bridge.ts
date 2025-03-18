import React from 'react';
import { Options } from './react-to-webcomponent';
import { CustomElementsWrapper } from './custom-elements-wrapper';
import { createRoot } from 'react-dom/client';

export class ReactCustomElementsBridge<Props> {
  static attributes: string[] = [];
  container?: HTMLElement;
  customElement?: CustomElementsWrapper;
  props: any = {};
  root: any;

  constructor(
    private component: React.ComponentType,
    private options: Options<Props>
  ) {
    ReactCustomElementsBridge.attributes = Object.keys(this.options.props!);
  }

  // CustomElement.constructor -> Bridge.prepare
  prepare(customElement: CustomElementsWrapper) {
    this.customElement = customElement;

    if (this.options.shadow) {
      this.container = this.customElement.attachShadow({
        mode: this.options.shadow,
      }) as unknown as HTMLElement;
    } else {
      this.container = this.customElement;
    }

    this.props = Object.entries(this.options.props!).reduce(
      (acc, [propName, propFormat]) => {
        const propValue = this.customElement?.getAttribute(propName);
        const formattedPropValue = this.transformPropValue(propValue!);
        return {
          ...acc,
          [propName]: formattedPropValue,
        };
      },
      {}
    );
  }

  // CustomElement.connectedCallback -> Bridge.intiComponent
  initComponent() {
    this.mount();
  }

  mount() {
    this.root = createRoot(this.container!);

    const element = React.createElement(this.component, this.props);
    this.root.render(element);
  }

  // CustomElement.disconnectedCallback -> Bridge.destroyComponent
  destroyComponent() {
    this.root.unmount();
  }

  getInput(propName: string) {}

  // CustomElement.attributeChangedCallback -> Bridge.setInput
  setInput(propName: string, value: string) {
    this.props[propName] = this.transformPropValue(value);
    const element = React.createElement(this.component, this.props);
    console.log(this.props);

    this.root.render(element);
  }

  transformPropValue(value: string, format = 'json') {
    // ... handle all value formats
    return JSON.parse(value);
  }
}
