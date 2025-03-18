class HelloWorldCustomElementsApi extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['name'];
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  connectedCallback() {
    this.div = document.createElement('div');
    this.text = document.createTextNode(this.name ?? '');
    this.div.appendChild(this.text);
    this.appendChild(this.div);
  }

  disconnectedCallback() {
    this.removeChild(this.div);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'name' && this.text) {
      this.text.textContent = newValue;
    }
  }
}

customElements.define(
  'my-hello-world-custom-elements-api',
  HelloWorldCustomElementsApi
);
