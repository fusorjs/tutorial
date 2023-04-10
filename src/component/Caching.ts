import {Component} from '@fusorjs/dom';
import {br, button, div, h2, h3, section, span} from '@fusorjs/dom/html';

import {Router} from 'share/router';

// this could be some heavy lifting component
const Counter = (count = 0) => span(' ', () => ++count);

// different usage and caching strategies for components returned from functions.
export const Caching = (router: Router) => {
  const wrapper = section(
    h2('Caching'),

    h3('Not returned from function'),

    div('one', Counter()),
    div('array', [Counter(), Counter(), Counter()]),

    h3('Re-creates on every update'),

    div('one', () => Counter()),
    div('array', () => [Counter(), Counter(), Counter()]),

    h3('Caches, but does not update'),

    (() => {
      const one = Counter();
      const arr = [Counter(), Counter(), Counter()];
      return [div('one', () => one), div('array', () => arr)];
    })(),

    h3('Caches and updates on init (twice), avoid it'),

    (() => {
      const one = Counter();
      const arr = [Counter(), Counter(), Counter()];
      return [
        div('one', () => one.update()),
        div('array', () => arr.map(i => i.update())),
      ];
    })(),

    h3('Caches on init and updates subsequently'),

    (() => {
      let one: Component<HTMLElement> | undefined;
      let arr: Component<HTMLElement>[] | undefined;
      return [
        div('one', () => one?.update() ?? (one = Counter())),
        div(
          'array',
          () =>
            arr?.map(i => i.update()) ??
            (arr = [Counter(), Counter(), Counter()]),
        ),
      ];
    })(),

    br(),

    button({click$e: () => wrapper.update()}, 'Update'),
  );

  return wrapper;
};
