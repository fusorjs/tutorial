import {update} from '@fusorjs/dom';

import css from './index.module.css';

// adapted from https://thenewcode.com/943/An-SVG-Analog-Clock-In-6-Lines-of-JavaScript

const rotate = (value: number) => `rotate(${value} 50 50)`;

export const AnalogClock = ({date = new Date()}) => (
  <div
    mount={self => {
      const timerId = setInterval(() => {
        date = new Date();
        update(self);
      }, 1000);

      return () => clearInterval(timerId);
    }}
  >
    <svg viewBox="0 0 100 100">
      <circle class={css.face} cx="50" cy="50" r="45" fill-opacity="50%" />
      <g>
        <rect
          class={css.hour}
          transform={() =>
            rotate(30 * (date.getHours() % 12) + date.getMinutes() / 2)
          }
          x="47.5"
          y="12.5"
          width="5"
          height="40"
          rx="2.5"
          ry="2.55"
        />
        <rect
          class={css.min}
          transform={() => rotate(6 * date.getMinutes())}
          x="48.5"
          y="12.5"
          width="3"
          height="40"
          rx="2"
          ry="2"
        />
        <line
          class={css.sec}
          transform={() => rotate(6 * date.getSeconds())}
          x1="50"
          y1="50"
          x2="50"
          y2="16"
        />
      </g>
    </svg>
  </div>
);
