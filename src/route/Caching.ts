import {Fusion, update} from '@fusorjs/dom';
import {br, button, div, p, section, span} from '@fusorjs/dom/html';

import {SourceLink} from 'component/SourceLink';

// this could be some heavy lifting component
const Counter = (count = 0) => span(' ', () => ++count);

// different usage and caching strategies for components returned from functions.
export const Caching = () => {
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
    div('array', () => [Counter(), Counter(), Counter()]),
    br(),

    div('Caches, but does not update'),
    (() => {
      const one = Counter();
      const arr = [Counter(), Counter(), Counter()];
      return [div('one', () => one), div('array', () => arr)];
    })(),
    br(),

    div('Caches and updates on init (twice), incorrect'),
    (() => {
      const one = Counter();
      const arr = [Counter(), Counter(), Counter()];
      return [
        div('one', () => update(one)),
        div('array', () => arr.map(i => update(i))),
      ];
    })(),
    br(),

    div('Caches on init and updates subsequently, correct'),
    (() => {
      let one: Fusion | undefined;
      let arr: Fusion[] | undefined;
      return [
        div('one', () => (one ? update(one) : (one = Counter()))),
        div(
          'array',
          () =>
            arr?.map(i => update(i)) ??
            (arr = [Counter(), Counter(), Counter()]),
        ),
      ];
    })(),
    br(),

    button({click_e: () => wrapper.update()}, 'Update'),

    p(
      'Also, check the ',
      SourceLink(`component/App.ts`, 'App.ts'),
      ', it caches the current page component.',
    ),
  );

  return wrapper;
};
