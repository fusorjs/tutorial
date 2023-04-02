import {Component} from '@fusorjs/dom';
import {br, button, div, h2, section, span} from '@fusorjs/dom/html';

import {Router} from 'share/router';

// this could be some heavy lifting component
const Counter = (count = 0) => span(': ', () => ++count);

export const Caching = (router: Router) => {
  const counter1 = Counter();
  const counter2 = Counter();

  let counter3: undefined | Component<HTMLElement>;

  const wrapper = section(
    h2('Caching'),

    div('Not dynamic', Counter()),

    div('Not cached, re-creates on every update', () => Counter()),

    div('Cached, does not update', () => counter1),

    div('Cached, updates, on init updates twice, avoid it', () =>
      counter2.update(),
    ),

    div(
      'Cached and updates',
      () => counter3?.update() ?? (counter3 = Counter()),
    ),

    br(),

    button({onclick: () => wrapper.update()}, 'Update'),
  );

  return wrapper;
};
