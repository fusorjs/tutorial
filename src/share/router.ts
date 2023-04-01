/** Nested Router */
export interface Router {
  baseRoute: string;
  getRoute: () => string;
}

/** Split route into two parts by separator ("/"). */
export const splitRoute = (route: string, separator = '/') => {
  const index = route.indexOf(separator);

  if (index === -1) return [route, ''];

  return [route.slice(0, index), route.slice(index + 1)];
};
