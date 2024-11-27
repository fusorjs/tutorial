import {update} from '@fusorjs/dom';
import {a, button, div, h4, hr, nav, p, section, span} from '@fusorjs/dom/html';

import {onRoute, pageSeparator, pushRoute, NestedRoute} from 'share/route';
import {SourceLink} from 'component/SourceLink';

const startsPage = 'starts';
const anotherPage = 'another';

const pageMap = {
  home: 'Welcome home!',
  [startsPage]: `This page route starts with "${startsPage}".`,
  [anotherPage]: 'Another page, yay!',
  nesting: 'Nesting page.',
};

type Page = keyof typeof pageMap;

const splitPage = (route: string, default_: Page = 'home'): [Page, string] => {
  if (route?.startsWith(startsPage))
    return [startsPage, route.replace(startsPage, '')];

  let [curr, next] = route.split(pageSeparator, 2);

  return [(curr in pageMap ? curr : default_) as Page, next ?? ''];
};

export const Routing = ({prevRoute, getNextRoute}: NestedRoute) => {
  let [selectedPage, nextRoute] = splitPage(getNextRoute());

  const Link =
    (page: Page, rest = '') =>
    () =>
      selectedPage === page
        ? span(page + rest)
        : a({href: prevRoute + page + rest}, page + rest);

  return section(
    {
      mount: self =>
        onRoute(() => {
          [selectedPage, nextRoute] = splitPage(getNextRoute());
          update(self);
        }),
    },

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
        click_e: () => pushRoute(prevRoute + anotherPage),
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

const RouterInfo = ({prevRoute, getNextRoute}: NestedRoute) =>
  div(p('prevRoute: ', prevRoute), p('nextRoute: ', getNextRoute));
