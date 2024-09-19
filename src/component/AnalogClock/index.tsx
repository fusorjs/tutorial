import {update} from '@fusorjs/dom';

import css from './index.module.css';

// adapted from https://thenewcode.com/943/An-SVG-Analog-Clock-In-6-Lines-of-JavaScript

export const AnalogClock = ({date = new Date()} = {}) => (
  <div
    mount={self => {
      const timerId = setInterval(() => {
        date = new Date();
        update(self);
      }, 1000);

      return () => clearInterval(timerId);
    }}
  >
    <svg viewBox="-50 -50 100 100">
      <circle class={css.face} r="48" />
      <line
        class={css.hour}
        transform={() =>
          `rotate(${30 * (date.getHours() % 12) + date.getMinutes() / 2})`
        }
        y2="-25"
      />
      <line
        class={css.minute}
        transform={() => `rotate(${6 * date.getMinutes()})`}
        y2="-35"
      />
      <line
        class={css.second}
        transform={() => `rotate(${6 * date.getSeconds()})`}
        y2="-35"
      />
    </svg>
  </div>
);
