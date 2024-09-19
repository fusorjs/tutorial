import {Params, update} from '@fusorjs/dom';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'local-non-standard': Params<HTMLDivElement>;
    }
  }
}

export const JSX = () => (
  <section style={'display:flex; flex-direction:column'}>
    <h2>JSX</h2>

    <global-non-standard click_e={e => {}}>
      Global Non-Standart Element
    </global-non-standard>

    <local-non-standard click_e={e => {}}>
      Local Non-Standart Element
    </local-non-standard>

    <h3>Components</h3>

    <CountingButton />
    <CountingButton count={22} />
    <CountingButton count={333} />

    <IntervalCounter />

    <h3>SVG</h3>

    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="green"
        stroke-width="4"
        fill="yellow"
      />
    </svg>

    {/* <svg height="100" width="200" xmlns="http://www.w3.org/2000/svg">
      <sa href="https://www.w3schools.com/graphics/" target="_blank">
        <circle r="45" cx="50" cy="50" fill="red" />
      </sa>
    </svg> */}

    <h3>MathML</h3>

    <math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size:3rem">
      <mfrac linethickness="3px">
        <mfrac bevelled="true">
          <mn>1</mn>
          <mi>x</mi>
        </mfrac>

        <mrow>
          <mi>y</mi>
          <mo>-</mo>
          <mn>2</mn>
        </mrow>
      </mfrac>
    </math>
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

JSX.filename = 'Jsx.tsx';
