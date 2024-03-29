// setup application in this main entry file

import {App} from 'route/App';

import './index.css';

// GitHub Pages support hash routing
let nextRoute = location.hash.substring(1);

const app = App({prevRoute: '#', getNextRoute: () => nextRoute});

// setup router
window.addEventListener(
  'popstate',
  () => {
    nextRoute = location.hash.substring(1);
    app.update();
  },
  false,
);

// append application to the page
document.body.append(app.element);
