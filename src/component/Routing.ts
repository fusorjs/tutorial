import {a, div, h2, h3, hr, nav, p, section, span} from '@fusorjs/dom/html';

import {Router, splitRoute} from 'share/router';

// define all page names to ease their management
const homePage = 'home';
const startsPage = 'starts';
const anotherPage = 'another';
const nestingPage = 'nesting';

const pageMap = {
  [homePage]: 'Welcome home!',
  [startsPage]: `This page route starts with "${startsPage}".`,
  [anotherPage]: 'Another page.',
  [nestingPage]: 'Nesting page.',
};

type Page = keyof typeof pageMap;

const defaultPage: Page = homePage;

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

  const Link = (page: Page, rest = '') =>
    selectedPage === page
      ? span(page + rest)
      : a({href: prevRoute + page + rest}, page + rest);

  return section(
    updateRoutes,

    h2('Routing'),

    h3('Base Route'),

    RouterInfo({prevRoute, getNextRoute}),

    // menu navigation
    nav(
      Link(homePage),
      Link(startsPage, '123'),
      Link(startsPage, '/abc'),
      Link(anotherPage),
      Link(nestingPage, '/uno'),
      a({href: prevRoute + 'unknown'}, 'unknown'),
    ),

    hr(),

    // content depends on the current route
    () =>
      section(
        h3(pageMap[selectedPage]),
        RouterInfo({
          prevRoute: prevRoute + selectedPage + '/',
          getNextRoute: () => nextRoute,
        }),
      ),
  );
};

const RouterInfo = ({prevRoute, getNextRoute}: Router) =>
  div(p('baseRoute: ', prevRoute), p('getRoute: ', getNextRoute));
