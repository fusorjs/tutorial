// setup application in this main entry file

import {getElement} from '@fusorjs/dom';

import {App} from 'route/App';
import {getRoute, routeRoot} from 'share/route';

import './index.css';

const app = App({prevRoute: routeRoot, getNextRoute: getRoute});

// append application to the page
document.body.append(getElement(app));
