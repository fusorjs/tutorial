import {jsx} from '@fusorjs/dom';
import '@fusorjs/dom/life';
import {AnalogClock} from 'component/AnalogClock';

export const JsxRoute = () => (
  <section style={'display:flex; flex-direction:column'}>
    <p>Here we are using JSX</p>

    <CountingButton />
    <CountingButton init={22} />
    <CountingButton init={333} />

    <IntervalCounter />

    <AnalogClock />
  </section>
);

const CountingButton = ({init: state = 0}) => {
  const component = (
    <button
      click$e={() => {
        state += 1;
        component.update();
      }}
    >
      Clicked {() => state} <OddOrEven number={() => state} /> times
    </button>
  );

  return component;
};

const OddOrEven = ({number}: {number: () => number}) => (
  <span style={() => `color:${number() % 2 ? 'red' : 'green'}`}>
    {() => (number() % 2 ? 'odd' : 'even')}
  </span>
);

const IntervalCounter = () => {
  let count = 0;
  let timerId: NodeJS.Timer | undefined;

  const wrapper = (
    <fusor-life
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
    </fusor-life>
  );

  return wrapper;
};
