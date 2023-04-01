// setup application in entry file

import {App} from 'component/App';

// GitHub Pages support hash routing
let route = location.hash.substring(1);

const app = App({baseRoute: '#', getRoute: () => route});

// setup router
window.addEventListener(
  'popstate',
  () => {
    route = location.hash.substring(1);
    app.update();
  },
  false,
);

// append application to the page
document.body.append(app.element);
