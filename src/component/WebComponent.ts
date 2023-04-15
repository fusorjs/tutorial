import {Options} from '@fusorjs/dom';
import {div, h, p, section} from '@fusorjs/dom/html';

import {Router} from 'share/router';
import {SourceLink} from './SourceLink';

export const WebComponent = (_: Router) => {
  const wrapper = section(
    p(
      `Here we will re-implement our interval counter from the `,
      SourceLink('component/LifeCycle.ts', 'LifeCycle.ts'),
      ` example using a Web Component.`,
    ),

    div(new Options({is: 'interval-counter'})),

    p('Open the console and see the log. Then switch away to the other page.'),
  );

  return wrapper;
};

customElements.define(
  'interval-counter',
  class extends HTMLDivElement {
    #count = 0;
    #wrapper = p('Timer: ', () => this.#count, ' seconds');
    #timerId?: NodeJS.Timer;

    constructor() {
      super();
      this.attachShadow({mode: 'open'}).append(this.#wrapper.element);
    }

    connectedCallback() {
      this.#timerId = setInterval(() => {
        this.#count++;
        this.#wrapper.update();
        console.log('Interval count', this.#count);
      }, 1000);
    }

    disconnectedCallback() {
      clearInterval(this.#timerId);
    }
  },
  {extends: 'div'},
);
