import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HelloComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import 'zone.js';

createApplication(appConfig)
  .then((app) => {
    const appComponent = createCustomElement(HelloComponent, {
      injector: app.injector,
    });
    customElements.define('my-hello-world', appComponent);
  })
  .catch((err) => console.error(err));
