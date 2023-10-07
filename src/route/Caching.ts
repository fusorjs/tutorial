import {Component} from '@fusorjs/dom';
import {br, button, div, p, section, span} from '@fusorjs/dom/html';

import {Router} from 'share/router';
import {SourceLink} from 'component/SourceLink';

// this could be some heavy lifting component
const Counter = (count = 0) => span(' ', () => ++count);

// different usage and caching strategies for components returned from functions.
export const Caching = (router: Router) => {
  const wrapper = section(
    p(
      `Here is an example of how to use dynamic values, update them, and cache them. Cache components in dynamic children.
      Otherwise, on every update they will be re-created.`,
    ),

    div('Not returned from function'),
    div('one', Counter()),
    div('array', [Counter(), Counter(), Counter()]),
    br(),

    div('Re-creates on every update'),
    div('one', () => Counter()),
    div(
      'array',
      // todo remove span when ranges are ready
      span(() => [Counter(), Counter(), Counter()]),
    ),
    br(),

    div('Caches, but does not update'),
    (() => {
      const one = Counter();
      const arr = [Counter(), Counter(), Counter()];
      return [div('one', () => one), div('array', () => arr)];
    })(),
    br(),

    div('Caches and updates on init (twice), avoid it'),
    (() => {
      const one = Counter();
      const arr = [Counter(), Counter(), Counter()];
      return [
        div('one', () => one.update()),
        div(
          'array',
          // todo remove span when ranges are ready
          span(() => arr.map(i => i.update())),
        ),
      ];
    })(),
    br(),

    div('Caches on init and updates subsequently'),
    (() => {
      let one: Component<HTMLElement> | undefined;
      let arr: Component<HTMLElement>[] | undefined;
      return [
        div('one', () => one?.update() ?? (one = Counter())),
        div(
          'array',
          // todo remove span when ranges are ready
          span(
            () =>
              arr?.map(i => i.update()) ??
              (arr = [Counter(), Counter(), Counter()]),
          ),
        ),
      ];
    })(),
    br(),

    button({click$e: () => wrapper.update()}, 'Update'),

    p(
      'Also, check the ',
      SourceLink(`component/App.ts`, 'App.ts'),
      ', it caches the current page component.',
    ),
  );

  return wrapper;
};
