# @fusorjs/dom-recipes

Fusor DOM recipes.

**[Demo Website](https://fusorjs.github.io/dom-recipes/)**

[Fusor DOM library](https://github.com/fusorjs/dom#readme)

## Setup

Initialize and configure your application in the entry file.

See: [index.ts](src/index.ts).

## Component

Create component and use it multiple times.

See: [ClickCounter.ts](src/component/ClickCounter.ts)

## Caching

Cache components in dynamic children.
Otherwise on every update they will be re-created.

See: [Caching](src/component/Caching.ts)

## Routing

- Setup routing: [index.ts](src/index.ts)
- Automatic nested routing: [App.ts](src/component/App.ts)
- More routing examples: [Routing.ts](src/component/Routing.ts)

> Routing abstraction makes it more complicated, IMHO.

## Todo

- different dynamic array children strategies
- memoization
- css usage
- hello world
- static vs dynamic
- publish
- usage with custom elements
- add descriptions with links to source files with ability to view them
- button routing with history.pushState
- selected menu items with routing
- proper http request with unmount, error handling, loading state
- svg usage

## Done

- interval counter with unmount
- caching
- basic routing
- counter button with dynamic counter
