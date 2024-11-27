import {Fusion, update} from '@fusorjs/dom';
import {a, h1, hr, main, nav, span} from '@fusorjs/dom/html';

import {NestedRoute, onRoute, pageSeparator} from 'share/route';
import {SourceLink} from 'component/SourceLink';

import {Home} from './Home';
import {Setup} from './Setup';
import {Component} from './Component';
import {LifeCycle} from './LifeCycle';
import {Request} from './Request';
import {Caching} from './Caching';
import {Routing} from './Routing';
import {CustomElement} from './CustomElement';
import {SVG} from './SVG';
import {JSX} from './JSX';
import {MathML} from './MathML';

// ! route component name must match its file name without extension, or have filename property difined (see: Jsx)
const pageMap = {
  // todo dynamic import
  Home,
  Setup,
  Component,
  LifeCycle,
  Request,
  Caching,
  Routing,
  CustomElement,
  JSX,
  SVG,
  MathML,
};

type Page = keyof typeof pageMap;

const splitPage = (route: string, default_: Page = 'Home'): [Page, string] => {
  let [curr, next] = route.split(pageSeparator, 2);

  return [(curr in pageMap ? curr : default_) as Page, next ?? ''];
};

export const App = ({prevRoute, getNextRoute}: NestedRoute) => {
  let [selectedPage, nextRoute] = splitPage(getNextRoute());

  return main(
    {
      mount: self =>
        onRoute(() => {
          [selectedPage, nextRoute] = splitPage(getNextRoute());
          update(self);
        }),
    },

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
    ((cachedPage?: string, cachedContent?: Fusion) => () => {
      if (cachedPage !== selectedPage) {
        cachedPage = selectedPage;
        cachedContent = pageMap[selectedPage]({
          prevRoute: prevRoute + selectedPage + pageSeparator,
          getNextRoute: () => nextRoute,
        });
      }

      return cachedContent;
    })(),

    hr(),

    // footer links
    nav(
      a('Github', {
        href: 'https://github.com/fusorjs/tutorial',
        target: '_blank',
      }),
      '-',
      () => SourceLink(getRouteFilename(selectedPage), 'Page Source'),
      // '-',
      // () =>
      //   a('Playground', {
      //     href:
      //       `https://codesandbox.io/p/sandbox/fusor-tutorial-fmm2pd?file=/src/` +
      //       getRouteFilename(selectedPage),
      //     target: '_blank',
      //   }),
      {style: 'justify-content:center'},
    ),
  );
};

const getRouteFilename = (name: Page) =>
  `route/${(pageMap[name] as any).filename ?? name + '.ts'}`;
