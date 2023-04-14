import {a, code, h4, p, pre, section} from '@fusorjs/dom/html';

import {Router} from 'share/router';

export const Setup = (_: Router) =>
  section(
    h4('Using a bundler'),

    p('Install Fusor:'),

    code('npm install @fusorjs/dom'),

    p('Use Fusor:'),

    pre(
      code(
        `\
import {div, p} from "@fusorjs/dom/html";

document.body.append(
  div(
    p("Hello World!"),
  )
);
`,
      ),
    ),

    p(
      'See ',
      a('standalone example', {
        href: 'https://codesandbox.io/s/fusor-intro-cvbhsk?file=/src/index.js',
        target: '_blank',
      }),
      '.',
    ),
  );
