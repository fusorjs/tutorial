import {a, b, p, section} from '@fusorjs/dom/html';

import {Router} from 'share/router';

export const Home = (_: Router) =>
  section(
    p(
      'This is a tutorial application for the ',
      a('Fusor', {
        href: 'https://github.com/fusorjs/dom#readme',
        target: '_blank',
      }),
      ' Javascript library.',
    ),

    p(
      'Each page in the top menu represents a specific topic of application development with Fusor. You should progress in learning these topics from the more basic on the left to the more advanced on the right.',
    ),

    p(
      'This page itself serves as an example of the most basic Fusor usage. Here Fusor generates a ',
      b('static'),
      ' HTML page. It does not have any dynamically updated data.',
    ),
  );
