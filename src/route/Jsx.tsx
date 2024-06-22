import {Component} from '@fusorjs/dom';

import {AnalogClock} from 'component/AnalogClock';

export const Jsx = () => (
  <section style={'display:flex; flex-direction:column'}>
    <p>Here we are using JSX by the way</p>

    <CountingButton />
    <CountingButton init={22} />
    <CountingButton init={333} />

    <IntervalCounter />

    <AnalogClock />
  </section>
);

const CountingButton = ({init: count = 0}) => (
  <button click_e_update={() => (count += 1)}>
    Clicked {() => count} <OddOrEven number={() => count} /> times
  </button>
);

const OddOrEven = ({number}: {number: () => number}) => (
  <span
    style={() =>
      `color:${
        number() % 2 ? 'red' : 'green'
      }; width:3em; text-align:center; display:inline-block`
    }
  >
    {() => (number() % 2 ? 'odd' : 'even')}
  </span>
);

const IntervalCounter = () => {
  let count = 0;

  const wrapper = (
    <div
      mount={() => {
        const timerId = setInterval(() => {
          count++;
          wrapper.update();
        }, 1000);
        return () => {
          clearInterval(timerId);
        };
      }}
    >
      Since this page was opened, {() => count}{' '}
      <OddOrEven number={() => count} /> seconds elapsed
    </div>
  ) as Component<Element>;

  return wrapper;
};

Jsx.filename = 'Jsx.tsx';
