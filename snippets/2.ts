import { createCustomElement } from '@angular/elements';
import { HelloComponent } from './1';
import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

@NgModule({
  declarations: [HelloComponent],
  imports: [BrowserModule],
  bootstrap: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const ngElement = createCustomElement(HelloComponent, {
      injector: this.injector,
    });
    customElements.define('my-hello', ngElement);
  }
}
