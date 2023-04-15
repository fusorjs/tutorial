import {a, h1, hr, main, nav, span} from '@fusorjs/dom/html';
import {Component as FComponent} from '@fusorjs/dom';

import {Router, splitRoute} from 'share/router';

import {Home} from './Home';
import {Setup} from './Setup';
import {Component} from './Component';
import {LifeCycle} from './LifeCycle';
import {Request} from './Request';
import {Caching} from './Caching';
import {Routing} from './Routing';
import {WebComponent} from './WebComponent';
import {Svg} from './Svg';
import {SourceLink} from './SourceLink';

const pageMap = {
  Home,
  Setup,
  Component,
  LifeCycle,
  Request,
  Caching,
  Routing,
  WebComponent,
  Svg,
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
      let cachedContent: FComponent<HTMLElement> | HTMLElement;

      return () => {
        if (cachedPage === selectedPage) {
          cachedContent instanceof FComponent && cachedContent.update();
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
      () => SourceLink(`component/${selectedPage}.ts`, 'Page Source'),
      '-',
      () =>
        a('Playground', {
          href: `https://codesandbox.io/s/fusor-tutorial-fmm2pd?file=/src/component/${selectedPage}.ts`,
          target: '_blank',
        }),
      {style: 'justify-content:center'},
    ),
  );
};
