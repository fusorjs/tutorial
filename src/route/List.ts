import {h2, section} from '@fusorjs/dom/html';

// todo Optimizations

export const Home = () =>
  section(
    h2('List Optimizations'),
    //
  );

// import {memoizeFunctionShallow} from '@fusorjs/generic';
// import {diffChildren} from '@fusorjs/dom-other';
// import {replaceChildren} from '@fusorjs/dom-other';
// import {MemoizeArrayMapShallow} from '@fusorjs/generic';

/**
 * Not available, experimental.
 */
// replaceChildren(
//   ul({class: 'todo-list'}),
//   () => getRouteItems().map(i => TodoItem({
//     getItem: () => i,
//     update,
//     remove,
//   })),
// ),

/**
 * Not available, experimental.
 */
// diffChildren(
//   ul({class: 'todo-list'}),
//   getItem => TodoItem({
//     getItem,
//     update,
//     remove,
//   }),
//   getRouteItems,
//   'id',
// ),

/**
 * Not available, experimental.
 */
// ul(
//   {class: 'todo-list'},
//   MemoizeArrayMapShallow(getRouteItems, todo => TodoItem({todo, todos})),
// ),
