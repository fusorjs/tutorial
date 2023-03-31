import {button, div, p} from '@fusorjs/dom/html';

const CounterButton = ({count = 0}) => {
  // create button Component
  const btn = button(
    // props:
    {
      onclick: () => {
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

document.body.append(
  div(
    p('Hello World!'), // static DOM Element

    // create dynamic components:
    CounterButton({}),
    CounterButton({count: 22}),
    CounterButton({count: 333}),
  ).element,
);
