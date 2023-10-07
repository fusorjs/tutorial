import {button, p, section} from '@fusorjs/dom/html';

import {Router} from 'share/router';

const CounterButton = ({count = 0}) => {
  // create button Component
  const btn = button(
    // props:
    {
      click$e: () => {
        count += 1;
        btn.update(); // update button text
      },
    },

    // children:
    'Clicked ',
    () => count, // dynamic value
    ' times.',
  );

  return btn;
};

export const Component = (_: Router) =>
  section(
    p(
      'Here we create a counting button component and instantiate it three times with different initial counter variables.',
    ), // static DOM Element

    // create dynamic components:
    CounterButton({}),
    CounterButton({count: 22}),
    CounterButton({count: 333}),
  );
