import {getElement} from '@fusorjs/dom';
import {div, p, section} from '@fusorjs/dom/html';

import {Router} from 'share/router';
import {SourceLink} from 'component/SourceLink';

export const CustomElement = (_: Router) => {
  const wrapper = section(
    p(
      `Here we will re-implement our interval counter from the `,
      SourceLink('component/LifeCycle.ts', 'LifeCycle.ts'),
      ` example using a Web Component.`,
    ),

    div({is: 'interval-counter'}),

    p('Open the console and see the log. Then switch away to the other page.'),
  );

  return wrapper;
};

customElements.define(
  'interval-counter',
  class extends HTMLDivElement {
    #count = 0;
    #wrapper = p('Timer: ', () => this.#count, ' seconds');
    #timerId?: NodeJS.Timeout;

    constructor() {
      super();
      this.attachShadow({mode: 'open'}).append(getElement(this.#wrapper));
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
