import {update} from '@fusorjs/dom';
import {button, input, p, section} from '@fusorjs/dom/html';

export const Component = () =>
  section(
    p(
      'Here we create a counting button component and instantiate it several times with different initial counter values.',
    ), // static DOM Element

    // create dynamic components:
    CounterButton(),
    CounterButton(22),
    CounterButton(333),

    p('Shorter component'),
    CounterShorter(),
    CounterShorter(22),
    CounterShorter(333),

    p('Shortest component'),
    CounterShortest(),
    CounterShortest(22),
    CounterShortest(333),

    p('Controlled Input'),
    UppercaseInput(),
  );

const CounterButton = (count = 0) => {
  // create button Component
  const btn = button(
    // props:
    {
      click_e: () => {
        count += 1;
        update(btn); // update button text
      },
    },

    // children:
    'Clicked ',
    () => count, // dynamic value
    ' times',
  );

  return btn;
};

const CounterShorter = (count = 0) =>
  button(
    {
      click_e: (event, self) => {
        count += 1;
        update(self);
      },
    },
    'Clicked ',
    () => count,
    ' times',
  );

const CounterShortest = (count = 0) =>
  button(
    {click_e_update: () => (count += 1)},
    'Clicked ',
    () => count,
    ' times',
  );

const UppercaseInput = ({value = ''} = {}) =>
  input({
    value: () => value,
    input_e_update: event => (value = event.target.value.toUpperCase()),
  });
