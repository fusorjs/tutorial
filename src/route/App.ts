import {Fusion, isUpdatable, update} from '@fusorjs/dom';
import {a, h1, hr, main, nav, span} from '@fusorjs/dom/html';

import {Router, splitRoute} from 'share/router';
import {SourceLink} from 'component/SourceLink';

import {Home} from './Home';
import {Setup} from './Setup';
import {Component} from './Component';
import {LifeCycle} from './LifeCycle';
import {Request} from './Request';
import {Caching} from './Caching';
import {Routing} from './Routing';
import {CustomElement} from './CustomElement';
import {Svg} from './Svg';
import {Jsx} from './Jsx';

// ! route component name must match its file name without extension, or have filename property difined (see: Jsx)
const pageMap = {
  Home,
  Setup,
  Component,
  LifeCycle,
  Request,
  Caching,
  Routing,
  CustomElement,
  Svg,
  Jsx,
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

    h1('Fusor Tutorial'),

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
    (() => {
      let cachedPage: string;
      let cachedContent: Fusion;

      return () => {
        if (cachedPage === selectedPage) {
          isUpdatable(cachedContent) && update(cachedContent);
        } else {
          cachedPage = selectedPage;
          cachedContent = pageMap[selectedPage]({
            prevRoute: prevRoute + selectedPage + '/',
            getNextRoute: () => nextRoute,
          });
        }

        return cachedContent;
      };
    })(),

    hr(),

    // footer links
    nav(
      a('Github', {
        href: 'https://github.com/fusorjs/tutorial#readme',
        target: '_blank',
      }),
      '-',
      () => SourceLink(getRouteFilename(selectedPage), 'Page Source'),
      '-',
      () =>
        a('Playground', {
          href:
            `https://codesandbox.io/p/sandbox/fusor-tutorial-fmm2pd?file=/src/` +
            getRouteFilename(selectedPage),
          target: '_blank',
        }),
      {style: 'justify-content:center'},
    ),
  );
};

const getRouteFilename = (name: Page) =>
  `route/${(pageMap[name] as any).filename ?? name + '.ts'}`;
