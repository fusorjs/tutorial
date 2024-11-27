import {Mount, update} from '@fusorjs/dom';

const DEVELOPMENT = process.env.NODE_ENV?.trim() === 'development';

export type Observer<A extends [], R> = (...a: A) => R;

export class Observable<A extends [], R> {
  #callbacks: Observer<A, R>[] = [];

  notify(...args: A) {
    for (const fn of this.#callbacks) fn(...args);
  }

  /** Get returned values from callbacks */
  notifyAcc(...args: A) {
    return this.#callbacks.map(fn => fn(...args));
  }

  subscribe(callback: Observer<A, R>) {
    if (DEVELOPMENT && this.#callbacks.includes(callback))
      throw new Error('observer already subscribed');

    this.#callbacks.push(callback);

    // console.log('subscribe');
  }

  unsubscribe(callback: Observer<A, R>) {
    const callbacks = this.#callbacks;
    const index = callbacks.indexOf(callback);

    if (index === -1) throw new Error('no observer to unsubscribe');

    callbacks.splice(index, 1);

    // console.log('unsubscribe');
  }
}

export class BoundObservable<A extends [], R> extends Observable<A, R> {
  on = (callback: Observer<A, R>) => {
    super.subscribe(callback);

    const unsubscribe = () => super.unsubscribe(callback);

    return unsubscribe;
  };

  mount: Mount = self => this.on((() => update(self)) as Observer<A, R>);
}
