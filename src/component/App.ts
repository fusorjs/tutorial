import {a, h1, main, nav} from '@fusorjs/dom/html';

import {Router, splitRoute} from 'share/router';

import {Home} from 'component/Home';
import {ClickCounter} from 'component/ClickCounter';
import {IntervalCounter} from 'component/IntervalCounter';
import {Caching} from 'component/Caching';
import {Routing} from 'component/Routing';

const menu = {
  Home,
  Component: ClickCounter,
  LifeCycle: IntervalCounter,
  Caching,
  Routing,
};

type Step = keyof typeof menu;

const defaultStep: Step = 'Home';

export const App = ({baseRoute, getRoute}: Router) =>
  main(
    h1('Fusor DOM Recipes'),

    // menu navigation
    nav(Object.keys(menu).map(step => a({href: baseRoute + step}, step))),

    // content depends on the current route
    () => {
      const [_s, nextRoute] = splitRoute(getRoute());
      const step = _s in menu ? (_s as Step) : defaultStep;
      const Content = menu[step];

      return Content({
        baseRoute: baseRoute + step + '/',
        getRoute: () => nextRoute,
      });
    },
  );
