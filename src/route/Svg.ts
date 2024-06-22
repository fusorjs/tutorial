import {a, p, section} from '@fusorjs/dom/html';
import {a as sa, animate, rect, svg, text} from '@fusorjs/dom/svg';

import {Router} from 'share/router';

// see: https://developer.mozilla.org/en-US/docs/Web/SVG/Namespaces_Crash_Course
const xlink_href = 'xlink:href_an_http://www.w3.org/1999/xlink';

export const Svg = (router: Router) =>
  section(
    p(
      'This is a simple SVG example. See also a ',
      a('namespaces crash course', {
        href: `https://developer.mozilla.org/en-US/docs/Web/SVG/Namespaces_Crash_Course`,
        target: '_blank',
      }),
      '.',
    ),

    svg(
      {width: 200, height: 200}, //, viewBox: '0 0 100 100'

      rect({width: '100%', height: '100%', fill: 'Moccasin'}),

      sa(
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
