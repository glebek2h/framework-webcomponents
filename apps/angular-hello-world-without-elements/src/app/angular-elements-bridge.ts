import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
} from '@angular/core';
import { Observable, merge, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export class AngularCustomElementsBridge {
  static attributes: string[] = [];
  componentRef?: ComponentRef<any>;
  initialInputValues: any = {};
  applicationRef?: ApplicationRef;
  outputEvents?: Observable<any>;
  ngElementEventsSubscription?: Subscription;

  constructor(
    private injector: Injector,
    private component: any,
    private componentFactory: ComponentFactory<any>
  ) {}

  // CustomElement.constructor -> Bridge.prepare
  prepare() {
    this.componentFactory.inputs.forEach((input) =>
      AngularCustomElementsBridge.attributes.push(input.templateName)
    );
  }

  // CustomElement.connectedCallback -> Bridge.intiComponent
  initComponent(element: HTMLElement) {
    const componentInjector = Injector.create([], this.injector);

    this.componentRef = this.componentFactory.create(
      componentInjector,
      null as any,
      element
    );

    this.componentFactory.inputs.forEach(
      (prop) =>
        (this.componentRef!.instance[prop.propName] =
          this.initialInputValues[prop.propName])
    );

    const eventEmitters = this.componentFactory.outputs.map(
      ({ propName, templateName }) => {
        const emitter = (this.componentRef!.instance as any)[
          propName
        ] as EventEmitter<any>;
        return emitter.pipe(
          map((value: any) => ({ name: templateName, value }))
        );
      }
    );

    this.outputEvents = merge(...eventEmitters);

    this.ngElementEventsSubscription = this.outputEvents.subscribe((e) => {
      const customEvent = document.createEvent('CustomEvent');
      customEvent.initCustomEvent(e.name, false, false, e.value);
      element.dispatchEvent(customEvent);
    });

    this.applicationRef = this.injector.get(ApplicationRef);

    this.applicationRef.attachView(this.componentRef.hostView);
  }

  // CustomElement.disconnectedCallback -> Bridge.destroyComponent
  destroyComponent() {
    this.componentRef!.destroy();
    this.ngElementEventsSubscription!.unsubscribe();
  }

  getInput(propName: string) {
    return this.componentRef && this.componentRef.instance[propName];
  }

  // CustomElement.attributeChangedCallback -> Bridge.setInput
  setInput(propName: string, value: string) {
    if (!this.componentRef) {
      this.initialInputValues[propName] = value;
      return;
    }
    if (this.componentRef.instance[propName] === value) {
      return;
    }
    this.componentRef.instance[propName] = value;
    this.componentRef.changeDetectorRef.detectChanges();
  }
}
