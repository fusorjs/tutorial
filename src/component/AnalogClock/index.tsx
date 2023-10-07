import {jsx} from '@fusorjs/dom';
import '@fusorjs/dom/life';

import css from './index.module.css';

// Inspired by https://thenewcode.com/943/An-SVG-Analog-Clock-In-6-Lines-of-JavaScript

export const AnalogClock = () => {
  let secondsDegree: number;
  let minutesDegree: number;
  let hoursDegree: number;

  const updateDegrees = () => {
    const d = new Date();

    secondsDegree = 6 * d.getSeconds();
    minutesDegree = 6 * d.getMinutes();
    hoursDegree = 30 * (d.getHours() % 12) + d.getMinutes() / 2;
  };

  updateDegrees();

  let timerId: NodeJS.Timer | undefined;

  const wrapper = (
    <fusor-life
      connected$e={() => {
        timerId = setInterval(() => {
          updateDegrees();
          wrapper.update();
        }, 1000);
      }}
      disconnected$e={() => {
        clearInterval(timerId);
      }}
    >
      <svg viewBox="0 0 100 100">
        <circle class={css.face} cx="50" cy="50" r="45" fill-opacity="50%" />
        <g>
          <rect
            class={css.hour}
            x="47.5"
            y="12.5"
            width="5"
            height="40"
            rx="2.5"
            ry="2.55"
            transform={() => `rotate(${hoursDegree} 50 50)`}
          />
          <rect
            class={css.min}
            x="48.5"
            y="12.5"
            width="3"
            height="40"
            rx="2"
            ry="2"
            transform={() => `rotate(${minutesDegree} 50 50)`}
          />
          <line
            class={css.sec}
            x1="50"
            y1="50"
            x2="50"
            y2="16"
            transform={() => `rotate(${secondsDegree} 50 50)`}
          />
        </g>
      </svg>
    </fusor-life>
  );

  return wrapper;
};
