import {h2, p, section} from '@fusorjs/dom/html';
import {math, mfrac, mi, mn, mo, mrow} from '@fusorjs/dom/mathml';

export const MathML = () =>
  section(
    h2('MathML'),

    math(mrow(mi('a'), mo('+'), mi('b'))),

    p('Complex fraction'),

    math(
      {style: 'font-size:3rem'},
      mfrac(
        {linethickness: '3px'},
        mfrac({bevelled: 'true'}, mn('1'), mi('x')),
        mrow(mi('y'), mo('-'), mn('2')),
      ),
    ),
  );
