// setup application in this main entry file

import {getElement, update} from '@fusorjs/dom';

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
    update(app);
  },
  false,
);

// append application to the page
document.body.append(getElement(app));
