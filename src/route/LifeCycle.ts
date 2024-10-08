import {update} from '@fusorjs/dom';
import {div, p} from '@fusorjs/dom/html';

export const LifeCycle = () =>
  div(
    p(
      'Here we have a simple interval counter component. We start counting when it is attached to the DOM and stop counting when it is removed from the DOM. If we do not remove it, it will count forever leaking memory.',
    ),

    IntervalCounter(),

    p('Open the console and see the log. Then switch away to the other page.'),
  );

const IntervalCounter = ({interval = 1000} = {}) => {
  let count = 0;

  return div(
    {
      mount: self => {
        const timerId = setInterval(() => {
          count++;
          update(self);
          console.log(`Elapsed ${count} seconds with ${interval} interval.`);
        }, interval);

        return () => {
          clearInterval(timerId);
        };
      },
    },

    p('Elapsed ', () => count, ' seconds with ', interval, ' interval.'),
  );
};

// History of the "unmount" solution findings:

/* Working with the deprecated <Life> component */
// export const LifeCycle = (router: Router) => {
//   let count = 0;
//   let timerId: NodeJS.Timeout;

//   const wrapper = Life(
//     {
//       connected$e: () => {
//         timerId = setInterval(() => {
//           count++;
//           wrapper.update();
//           console.log('Interval count', count);
//         }, 1000);
//       },
//       disconnected$e: () => {
//         clearInterval(timerId);
//       },
//     },

//     p(
//       'Here we have a simple interval counter component. We start counting when it is attached to the DOM and stop counting when it is removed from the DOM. If we do not remove it, it will count forever leaking memory.',
//     ),

//     p('Timer: ', () => count, ' seconds'),

//     p('Open the console and see the log. Then switch away to the other page.'),
//   );

//   return wrapper;
// };

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
