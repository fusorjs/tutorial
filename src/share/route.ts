import {BoundObservable} from '../lib/Observable';

// GitHub Pages support only hash routing
export const routeRoot = '#';
const read = () => location.hash.substring(1);

let route = read();
const observable = new BoundObservable();

window.addEventListener(
  'popstate',
  () => {
    const next = read();

    if (route === next) return;

    route = next;
    observable.notify();
  },
  false,
);

export const getRoute = () => route;
export const {on: onRoute} = observable;

export const pageSeparator = '/';

export interface NestedRoute {
  prevRoute: string;
  getNextRoute: () => string;
}

const popStateEvent = new PopStateEvent('popstate');

export const pushRoute = (route: string) => {
  history.pushState(undefined, '', route);
  dispatchEvent(popStateEvent);
};
