import {a, h1, hr, main, nav, span} from '@fusorjs/dom/html';

import {Router, splitRoute} from 'share/router';

import {Home} from 'component/Home';
import {Component} from 'component/Component';
import {LifeCycle} from 'component/LifeCycle';
import {Request} from 'component/Request';
import {Caching} from 'component/Caching';
import {Routing} from 'component/Routing';
import {Svg} from 'component/Svg';

const pageMap = {
  Home,
  Component,
  LifeCycle,
  Request,
  Caching,
  Routing,
  SVG: Svg,
};

type Page = keyof typeof pageMap;

const defaultPage: Page = 'Home';

export const App = ({prevRoute, getNextRoute}: Router) => {
  let selectedPage: Page;
  let nextRoute: string;

  const updateRoutes = () => {
    [selectedPage, nextRoute] = splitRoute(getNextRoute()) as any;
    if (!(selectedPage in pageMap)) selectedPage = defaultPage;
  };

  updateRoutes();

  return main(
    updateRoutes,

    h1('Fusor DOM Recipes'),

    // menu navigation
    nav(
      Object.keys(pageMap).map(
        page => () =>
          page === selectedPage
            ? span(page)
            : a({href: prevRoute + page}, page),
      ),
    ),

    hr(),

    // content depends on the current route
    () => {
      const Content = pageMap[selectedPage];

      return Content({
        prevRoute: prevRoute + selectedPage + '/',
        getNextRoute: () => nextRoute,
      });
    },
  );
};
