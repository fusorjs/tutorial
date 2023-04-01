import {a, div, h2, h3, nav, p, section} from '@fusorjs/dom/html';

import {Router, splitRoute} from 'share/router';

const RouterInfo = ({baseRoute, getRoute}: Router) =>
  div(p('baseRoute: ', baseRoute), p('getRoute: ', getRoute));

// define all steps to ease their management
const startsStep = 'starts';
const firstStep = 'first';
const secondStep = 'second';
const nestedStep = 'nested';
const defaultStep = firstStep;

export const Routing = ({baseRoute, getRoute}: Router) =>
  section(
    h2('Routing'),

    h3('Base Route'),

    RouterInfo({baseRoute, getRoute}),

    // menu navigation
    nav(
      a({href: baseRoute}, 'home'),
      a({href: baseRoute + startsStep + '123'}, startsStep + '123'),
      a({href: baseRoute + startsStep + '/abc'}, startsStep + '/abc'),
      a({href: baseRoute + firstStep}, firstStep),
      a({href: baseRoute + secondStep}, secondStep),
      a({href: baseRoute + nestedStep + '/uno'}, nestedStep + '/uno'),
      a({href: baseRoute + 'unknown'}, 'unknown'),
    ),

    h3('Next Route'),

    // content depends on the current route
    () => {
      const route = getRoute();

      // route starts with
      if (route?.startsWith(startsStep)) {
        const nextRoute = route.replace(startsStep, '');
        console.log({route}); // todo double call

        return RouterInfo({
          baseRoute: baseRoute + startsStep,
          getRoute: () => nextRoute,
        });
      }

      const [step, nextRoute] = splitRoute(route);

      // predefined routes
      switch (step) {
        case firstStep:
        case secondStep:
        case nestedStep:
          return RouterInfo({
            baseRoute: baseRoute + step + '/',
            getRoute: () => nextRoute,
          });
      }

      // default route
      return RouterInfo({
        baseRoute: baseRoute + defaultStep + '/',
        getRoute: () => nextRoute,
      });
    },
  );
