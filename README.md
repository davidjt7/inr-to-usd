# INR to USD

A basic inr to usd backend built with TypeScript that uses a PostgreSQL database to save requests

# Requirements

- Node.js (v14.5.0)
- Yarn Package Manager
- PostgreSQL

# Installation and Setup

- Clone the repo
- Issue `yarn` command
- Create `.env` from `env.sample` and update environment configurations

# Build and Run

- `yarn build` transpiles the TS code. For development, `yarn build:watch` is useful, the command will build code immediately if the code is changed.
- The server can be started `yarn start`. For development, `yarn dev:watch` is useful, this command will use nodemon, so then restart the node server for any changes.

# Tests and Lint

- Tests and coverage reports are provided by Jest. They can be started by issuing `yarn test`
- Linting checks are done using tslint using a [Airbnb rule set](https://www.npmjs.com/package/tslint-config-airbnb). The lint check can be started by issuing `yarn lint`

# Tips

## Recommended Setup (macOS/Linux)

- Use [Zsh](https://ohmyz.sh) as shell and [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh) for useful aliases among other customizable features
- Use LTS version of Node as recommended
