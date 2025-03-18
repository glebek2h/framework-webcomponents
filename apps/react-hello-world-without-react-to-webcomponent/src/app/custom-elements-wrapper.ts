import { ReactCustomElementsBridge } from './custom-elements-bridge';

export class CustomElementsWrapper extends HTMLElement {
  static bridge: ReactCustomElementsBridge<any>;

  constructor() {
    super();

    CustomElementsWrapper.bridge.prepare(this);
  }

  static get observedAttributes() {
    return ReactCustomElementsBridge.attributes;
  }

  connectedCallback() {
    CustomElementsWrapper.bridge.initComponent();
  }

  disconnectedCallback() {
    CustomElementsWrapper.bridge.destroyComponent();
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: string) {
    CustomElementsWrapper.bridge.setInput(attrName, newVal);
  }
}
