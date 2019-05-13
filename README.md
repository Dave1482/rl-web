# Rocket League Replay Parser (rl-web)

The Rocket League Replay Parser (rl-web) allows one to select a local [Rocket League](https://www.rocketleague.com/) replay and view statistics all from the comfort of their browser without any data being uploaded.

## Screenshot

![Screenshot of web page](assets/rl-web-screenshot.png?raw=true)

## Goals

- *Lightweight*: Javascript bundle weighs 8kb gzipped to facilitate quick loading. No HTTP extraneous requests. No tracking. No ads.
- *WebAssembly*: [Boxcars](https://github.com/nickbabcock/boxcars) is used behind the scenes due to how efficient it is at parsing replays. Boxcars is in Rust, but through WebAssembly we can see the same efficiency in the browser.
- *Minimal dependencies*: This web app only relies on a single js and css dependency: ([preact](https://preactjs.com/) and [sanitize.css](https://csstools.github.io/sanitize.css/)). Minimal dependencies help keep the app lightweight and results in easier maintenance as it reduces the possibility of breaking changes and funky interactions between libraries. To a lesser extent, dev dependencies should be minimized to mitigate the possibility of the build breaking. Fewer dev dependencies are worth it even if this means sacrificing trendy features like css modules.
- *Easy Maintenance*: rl-web is not destined for greatness, but it can expect to see sporadic updates. These updates should not be bogged down trying to re-grok the codebase or fixing dependencies. They should, as much as possible, be spent adding features / bugfixes.
- *Static Typing*: [Typescript](https://www.typescriptlang.org/) removes the cognitive burden null checks, type definitions, and eliminates silly mistsakes which in turns allows for easier maintenance as one can focus on bugfixes and features.
- *Minimal Config*: [Parcel](https://parceljs.org/) allows a zero config setup for both development and production builds. Zero config makes the project easier to maintain. When a build dependency receives an update, the fewer times I have to look at a config and ask (is this relevant) the better. Parcel may not be as flexible, but it's a worthwhile tradeoff.
- *Integration Testing*: [Cypress](https://www.cypress.io/) is used for end to end tests against the actual site. These tests confirm ability of the WebAssembly and js to function against real world input. Integration tests allows rl-web to skip component testing in favor of . With no component tests, rl-web is free to swap out the internals (ie: move to a different framework) and not invalidate any tests (easy maintenance). There are still unit tests, but only those that don't use the DOM.

## Non-Goals

- *Increase browser support*: [85% of users have access to WebAssembly](https://caniuse.com/#feat=wasm). It's futile to chase that last 15%.
- *Server*: While it would be cool to allow users to upload replays to allow others to view the statistics, having a server to store replays increases costs and complexity. Not practical at this time.
- *Competition*: You want actual statistics and value? [calculated.gg](https://calculated.gg/). In light of calculated.gg, rl-web should be viewed as an experiment.
