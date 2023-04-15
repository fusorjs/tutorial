import {a, button, div, h4, hr, nav, p, section, span} from '@fusorjs/dom/html';

import {pushRoute, Router, splitRoute} from 'share/router';

import {SourceLink} from './SourceLink';

const startsPage = 'starts';
const anotherPage = 'another';

const pageMap = {
  home: 'Welcome home!',
  [startsPage]: `This page route starts with "${startsPage}".`,
  [anotherPage]: 'Another page, hey!',
  nesting: 'Nesting page.',
};

type Page = keyof typeof pageMap;

const defaultPage: Page = 'home';

export const Routing = ({prevRoute, getNextRoute}: Router) => {
  let selectedPage: Page;
  let nextRoute: string;

  const updateRoutes = () => {
    const route = getNextRoute();
    if (route?.startsWith(startsPage)) {
      selectedPage = startsPage;
      nextRoute = route.replace(startsPage, '');
    } else {
      [selectedPage, nextRoute] = splitRoute(getNextRoute()) as any;
      if (!(selectedPage in pageMap)) selectedPage = defaultPage;
    }
  };

  updateRoutes();

  const Link =
    (page: Page, rest = '') =>
    () =>
      selectedPage === page
        ? span(page + rest)
        : a({href: prevRoute + page + rest}, page + rest);

  return section(
    updateRoutes,

    p(
      'This is an example of how nested routing could be implemented. This page is the third level, the second level is in ',
      SourceLink(`component/App.ts`, 'App.ts'),
      ', and the first level is in the ',
      SourceLink(`index.ts`, 'index.ts'),
      ' with router setup. GitHub Pages supports only "hash" routing.',
    ),

    h4('My Route'),

    RouterInfo({prevRoute, getNextRoute}),

    // menu navigation
    nav(
      Link('home'),
      Link(startsPage, '123'),
      Link(startsPage, '/abc'),
      Link(anotherPage),
      Link('nesting', '/uno'),
      a({href: prevRoute + 'unknown'}, 'unknown'),
      a({href: prevRoute}, 'top'),
      button(anotherPage, {
        click$e: () => pushRoute(prevRoute + anotherPage),
        disabled: () => selectedPage === anotherPage,
      }),
    ),

    hr(),

    // content depends on the current route
    () =>
      section(
        h4(pageMap[selectedPage]),
        RouterInfo({
          prevRoute: prevRoute + selectedPage + '/',
          getNextRoute: () => nextRoute,
        }),
      ),
  );
};

const RouterInfo = ({prevRoute, getNextRoute}: Router) =>
  div(p('prevRoute: ', prevRoute), p('nextRoute: ', getNextRoute));
