import React from 'react';
import { ReactCustomElementsBridge } from './custom-elements-bridge';
import { CustomElementsWrapper } from './custom-elements-wrapper';

type R2WCType = 'string' | 'number' | 'boolean' | 'function' | 'json';

type PropName<Props> = Exclude<Extract<keyof Props, string>, 'container'>;
type PropNames<Props> = Array<PropName<Props>>;

export interface Options<Props> {
  shadow?: 'open' | 'closed';
  props?: PropNames<Props> | Partial<Record<PropName<Props>, R2WCType>>;
  events?: PropNames<Props> | Partial<Record<PropName<Props>, EventInit>>;
}

export function reactToWebComponent<Props>(
  component: React.ComponentType,
  options: Options<Props>
) {
  CustomElementsWrapper.bridge = new ReactCustomElementsBridge(
    component,
    options
  );
  return CustomElementsWrapper;
}
