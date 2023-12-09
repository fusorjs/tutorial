import {Component, jsx} from '@fusorjs/dom';
import {Life} from '@fusorjs/dom/life';

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
  <button click$e$update={() => (count += 1)}>
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
  let timerId: NodeJS.Timeout;

  const wrapper = (
    <Life
      connected$e={() => {
        timerId = setInterval(() => {
          count++;
          wrapper.update();
        }, 1000);
      }}
      disconnected$e={() => {
        clearInterval(timerId);
      }}
    >
      Since this page was opened, {() => count}{' '}
      <OddOrEven number={() => count} /> seconds elapsed
    </Life>
  ) as Component<Element>;

  return wrapper;
};

Jsx.filename = 'Jsx.tsx';
