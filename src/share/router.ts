/** Nested Router */
export interface Router {
  prevRoute: string;
  getNextRoute: () => string;
}

/** Split route into two parts by separator ("/"). */
export const splitRoute = (route: string, separator = '/') => {
  const index = route.indexOf(separator);

  if (index === -1) return [route, ''];

  return [route.slice(0, index), route.slice(index + 1)];
};

const popStateEvent = new PopStateEvent('popstate');

export const pushRoute = (route: string) => {
  history.pushState(undefined, '', route);
  dispatchEvent(popStateEvent);
};
