import {
  a,
  button,
  div,
  h2,
  p,
  section,
  table,
  tbody,
  td,
  th,
  thead,
  tr,
} from '@fusorjs/dom/html';
import {Life} from '@fusorjs/dom/life';

import {Router} from 'share/router';

type User = {id: number; username: string; name: string; email: string};

export const Request = (router: Router) => {
  let loading = false;
  let data: User[] | undefined;
  let error: any;
  let abort: AbortController | undefined;

  const getUsers = async () => {
    try {
      loading = true;
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
      loading = false;
      wrapper.update();
    }
  };

  const wrapper = section(
    h2('Request'),

    p(
      'This is a proper way to do requests. With loading state, aborting and error handling.',
    ),

    div(
      button('Request users', {
        disabled: () => loading,
        click$e: getUsers,
      }),

      button('Abort', {
        disabled: () => !loading,
        click$e: () => abort?.abort(),
      }),
    ),

    div(
      () => loading && p('Loading...'),
      () => error && p('Error: ', error?.message || error, {class: 'error'}),
      () =>
        data &&
        table(
          thead(tr(th('Id'), th('User'), th('Name'), th('Email'))),
          tbody(data.map(i => UserRow(i))),
        ),
    ),

    Life({disconnected$e: () => abort?.abort()}),
  );

  return wrapper;
};

const UserRow = ({id, username, name, email}: User) =>
  tr(td(id), td(username), td(name), td(a(email, {href: 'mailto:' + email})));
