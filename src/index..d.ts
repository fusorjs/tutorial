declare module '*.module.css' {
  const classes: {[key: string]: string};
  export default classes;
}

declare module '@fusorjs/dom/jsx-runtime' {
  declare global {
    // namespace Fusor {
    //   type ParameterSeparator = '$';
    // }
    namespace JSX {
      interface IntrinsicElements {
        'global-non-standard': import('@fusorjs/dom').Params<HTMLDivElement>;
      }
    }
  }
}
