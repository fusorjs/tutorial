import {
  a,
  button,
  div,
  p,
  section,
  table,
  tbody,
  td,
  th,
  thead,
  tr,
} from '@fusorjs/dom/html';

import {Router} from 'share/router';

type User = {id: number; username: string; name: string; email: string};

export const Request = (router: Router) => {
  let data: User[] | undefined;
  let error: any;
  let abort: AbortController | undefined;

  const getUsers = async () => {
    try {
      data = undefined;
      error = undefined;
      abort = new AbortController();
      wrapper.update();

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        {signal: abort!.signal},
      );

      data = await response.json();
    } catch (e) {
      error = e;
    } finally {
      abort = undefined;
      wrapper.update();
    }
  };

  const wrapper = section(
    {mount: () => () => abort?.abort()},

    p(
      'This is a proper way to do api requests. Using loading state, aborting and handling errors.',
    ),

    div(
      button('Request users', {
        disabled: () => abort !== undefined,
        click_e: getUsers,
      }),

      button('Abort', {
        disabled: () => abort === undefined,
        click_e: () => abort?.abort(),
      }),
    ),

    div(
      () => abort && p('Loading...'),
      () => error && p('Error: ', error?.message || error, {class: 'error'}),
      () =>
        data &&
        table(
          thead(tr(th('Id'), th('User'), th('Name'), th('Email'))),
          tbody(data.map(i => UserRow(i))),
        ),
    ),
  );

  return wrapper;
};

const UserRow = ({id, username, name, email}: User) =>
  tr(td(id), td(username), td(name), td(a(email, {href: 'mailto:' + email})));
