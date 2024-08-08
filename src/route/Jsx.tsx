import {update} from '@fusorjs/dom';

export const Jsx = () => (
  <section style={'display:flex; flex-direction:column'}>
    <p>Here we are using JSX by the way</p>

    <CountingButton />
    <CountingButton count={22} />
    <CountingButton count={333} />

    <IntervalCounter />
  </section>
);

const CountingButton = ({count = 0}) => (
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

const IntervalCounter = ({count = 0}) => (
  <div
    mount={self => {
      const timerId = setInterval(() => {
        count++;
        update(self);
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }}
  >
    Since this page was opened, {() => count} <OddOrEven number={() => count} />{' '}
    seconds elapsed.
  </div>
);

Jsx.filename = 'Jsx.tsx';
