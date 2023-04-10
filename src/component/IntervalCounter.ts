import {h, h2, p} from '@fusorjs/dom/html';
import '@fusorjs/dom/life';

import {Router} from 'share/router';

export const IntervalCounter = (router: Router) => {
  let count = 0;
  let timerId: NodeJS.Timer | undefined;

  const wrapper = h(
    'fusor-life',
    {
      connected$e: () => {
        timerId = setInterval(() => {
          count++;
          wrapper.update();
          console.log('Interval count', count);
        }, 1000);
      },
      disconnected$e: () => {
        clearInterval(timerId);
      },
    },

    h2('Intrval Counter'),

    p('Timer: ', () => count, ' seconds'),
  );

  return wrapper;
};

// History of the unmount solution finding:

/* Working solution with custom element */
// const wrapper = div(new Options({is: 'interval-counter'}));
// customElements.define(
//   'interval-counter',
//   class extends HTMLDivElement {
//     #count = 0;
//     #wrapper = section(
//       h2('Intrval Counter'),
//       p('Timer: ', () => this.#count, ' seconds'),
//     );
//     #timerId?: NodeJS.Timer;

//     constructor() {
//       super();
//       this.attachShadow({mode: 'open'}).append(this.#wrapper.element);
//     }

//     connectedCallback() {
//       this.#timerId = setInterval(() => {
//         this.#count++;
//         this.#wrapper.update();
//         console.log('Interval count', this.#count);
//       }, 1000);
//     }

//     disconnectedCallback() {
//       clearInterval(this.#timerId);
//     }
//   },
//   {extends: 'div'},
// );

/* Working solution, but MutationEvent is deprecated */
// {
//   onDOMNodeRemoved: () => {
//     clearInterval(id);
//   },
// },

/* Probable solution, too complex to implement and slow. */
// {
//   onmount: self => {
//     const id = setInterval(() => {
//       count++;
//       self.update();
//       console.log('Interval count', count);
//     }, 1000);

//     return () => clearInterval(id); // unmount
//   },
// },

/* WeakRef example, not reliable, could never trigger. */
// const weakWrapper = new WeakRef(wrapper);
// const intervalId = setInterval(() => {
//   const wrapper = weakWrapper.deref();

//   if (!wrapper) {
//     clearInterval(intervalId);
//     return;
//   }

//   count++;
//   wrapper.update();
//   console.log('Interval count', count);
// }, 1000);

/* Memory leaked example, open the console and switch away from this page. */
// setInterval(() => {
//   count++;
//   wrapper.update();
//   console.log('Interval Memory Leak!!!', count);
//   // After switching to other page,
//   // wrapper will never be freed,
//   // this event will continue indefinitely.
// }, 1000);
