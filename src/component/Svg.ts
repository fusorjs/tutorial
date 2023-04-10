import {h2, section} from '@fusorjs/dom/html';
import {a, animate, rect, svg, text} from '@fusorjs/dom/svg';

import {Router} from 'share/router';

// see: https://developer.mozilla.org/en-US/docs/Web/SVG/Namespaces_Crash_Course
const xlink_href = 'xlink:href$an$http://www.w3.org/1999/xlink';

export const Svg = (router: Router) =>
  section(
    h2('Svg'),

    svg(
      {width: 200, height: 200}, //, viewBox: '0 0 100 100'

      rect({width: '100%', height: '100%', fill: 'Moccasin'}),

      a(
        {[xlink_href]: 'https://www.w3schools.com/graphics/', target: '_blank'},
        text({x: 15, y: 55, fill: 'red'}, 'I love SVG!'),
      ),

      rect(
        {
          x: 100,
          y: 100,
          width: 30,
          height: 30,
          stroke: 'black',
          fill: 'transparent',
          'stroke-width': 5,
        },
        animate({
          attributeType: 'CSS',
          attributeName: 'opacity',
          from: 1,
          to: 0,
          dur: '5s',
          repeatCount: 'indefinite',
        }),
      ),
    ),
  );
