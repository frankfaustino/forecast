# <a name="0"></a>forecasten 📈
forecasten is a web application designed to digest inventory data and produce a dashboard of modularized data visualizations.

***

## Team
| [**Megan Williamson**](https://github.com/gooseandmegander) | [**Frank Faustino**](https://github.com/frankfaustino) |
|:----------------:|:----------------:|
| [<img src="https://avatars3.githubusercontent.com/u/16904116?s=400&v=4" width="80">](https://github.com/gooseandmegander) | [<img src="https://avatars1.githubusercontent.com/u/2607929?s=460&v=4" width="80">](https://github.com/frankfaustino) |
| [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/gooseandmegander)  |  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/frankfaustino) |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/megan-williamson/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/frankfaustino/) |

***

## Contents
- [Features](#features)
- [Usage](#usage)
- [Environment variables](#environment-variables)
- [Built with](#built-with)
- [Screenshots](#screenshots)
- [API documentation](#api-documentation)
- [Project structure](#project-structure)

## Features
- Server-side rendering for [fast initial load and SEO](https://hackernoon.com/server-side-vs-client-side-rendering-in-react-apps-443efd6f2e87)
- User authentication with Clover OAuth, cookies, and sessions
- Opinionated architecture: 
  - React components structured with [BEM naming convention](http://getbem.com/naming/)
  - minimal/no babel and webpack configuration (uses TypeScript)
  - `withAuth` HOC to pass user prop and control user access to pages
  - `withApollo` HOC that provides the Apollo client to React
- Server-side [environment variables](#environment-variables) managed with `dotenv`
- Production-ready, scalable architecture:
  - `client` — user-facing web app with Next.js server, responsible for rendering pages (either client-side or server-side). `client` sends requests via GraphQL queries to `server`'s GraphQL endpoint.
  - `server` — Express and Apollo server, responsible for processing requests for internal and external APIs and GraphQL queries and mutations.

## Usage

### Installation

```bash
git clone https://github.com/forecasten/forecasten.git
cd forecasten
yarn
```

### Running locally:
Create an `.env` file inside the `forecasten/server` directory with the environment variables listed below. This file `must` have values for the `required` variables.

#### Environment Variables
| Key | Description | Required |
|-----|-------------|----------|
| PORT | Apollo server's port | required |
| APP_ID | Your Clover Developer App ID | required |
| APP_SECRET | Your Clover Developer App Secret | required |


Once `.env` is created and populated, you can run both the `server` and `client` from the root directory with the command below:
```bash
yarn dev
```

## Installing Packages
To install dependencies on the backend server, use the command:

```bash
yarn workspace @forecasten/server add <package_name>
```

Similarly, to install dependencies on the frontend client:

```bash
yarn workspace @forecasten/client add <package_name>
```

To remove a dependency:

```bash
yarn workspace @forecasten/client remove <package_name>
```


## Deploying 🚀

WIP 🚧 👷‍ 🏗


## Built with

### `frontend`
|Pkgs|Description|Link|
|----|-----------|----|
| `typescript` | Typed superset of JavaScript |[docs](https://www.typescriptlang.org/)|
| `graphql` | JavaScript reference implementation for GraphQL |[github](https://github.com/graphql/graphql-js)|
| `next` | Server-side rendered React framework |[docs](https://nextjs.org/learn)|
| `react` | JavaScript library for building UI |[docs](https://reactjs.org/)|
| `react-apollo` | React data container for Apollo Client |[github](https://github.com/apollographql/react-apollo#readme)|
| `apollo-boost` | Zero-config Apollo Client |[github](https://github.com/apollographql/apollo-client#readme)|
| `next-with-apollo` | Apollo HOC for Next.js |[github](https://github.com/lfades/next-with-apollo#readme)|
| `styled-components` | Visual primitives library |[docs](https://www.typescriptlang.org/)|
| `graphql-tag` | JavaScript template literal tag that parses GraphQL queries |[github](https://github.com/apollographql/graphql-tag#readme)|
| `yup` | JavaScript object schema validator and parser |[github](https://github.com/jquense/yup)|
| `jest` | JavaScript testing |[docs](https://jestjs.io/)|
| `enzyme` | JavaScript testing utilities for React |[docs](https://airbnb.io/enzyme/)|
| `tslint` | Static analysis tool that checks TypeScript code for readability |[github](https://www.npmjs.com/package/tslint)|
| `nprogress` | Progress bar |[github](https://www.npmjs.com/package/nprogress)|


### `backend`

|Pkgs|Description|Link|
|----|-----------|----|
| `apollo-server-express` | Apollo GraphQL Server |[github](https://github.com/apollographql/apollo-server#readme)|
| `express` | JavaScript web framework |[docs](http://expressjs.com/)|
| `graphql` | JavaScript reference implementation for GraphQL |[github](https://github.com/graphql/graphql-js)|
| `graphql-import` | Import and export defs for GraphQL |[github](https://github.com/graphcool/graphql-import#readme)|
| `graphql-middleware` | Schema wrapper for middleware |[github](https://github.com/prisma/graphql-middleware)|
| `graphql-request` | Minimal GraphQL client for Node (used here for testing) |[github](https://github.com/prisma/graphql-request)|
| `graphql-shield` | GraphQL server permissions middleware |[github](https://github.com/maticzav/graphql-shield)|
| `prisma-client-lib` | Dependencies for Prisma |[npm](https://www.npmjs.com/package/prisma-client-lib)|
| `bcrypt` | Password hashing |[github](https://github.com/kelektiv/node.bcrypt.js#readme)|
| `express-session` | Session middleware for Express |[github](https://www.npmjs.com/package/express-session)|
| `jsonwebtoken` | JavaScript implementation of JSON Web Tokens |[github](https://github.com/auth0/node-jsonwebtoken#readme)|
| `connect-redis` | Redis session store |[github](https://github.com/tj/connect-redis#readme)|
| `ioredis` | Redis client |[github](https://github.com/luin/ioredis#readme)|
| `yup` | JavaScript object schema validator and parser |[github](https://github.com/jquense/yup)|
| `dotenv` | Loads environment variables from file |[github](https://github.com/motdotla/dotenv#readme)|
| `dotenv-cli` | Runs apps with environment variables |[github](https://github.com/caske33/dotenv-cli#readme)|
| `gql2ts` | Converts GraphQL schemas to TypeScript defs |[github](https://github.com/avantcredit/gql2ts#readme)|
| `ts-jest` | Preprocessor with source maps support to help use TypeScript with Jest |[github](https://kulshekhar.github.io/ts-jest)|
| `ts-node` | TypeScript execution environment and REPL for node.js, with source map support |[github](https://github.com/TypeStrong/ts-node)|
| `jest` | JavaScript testing |[docs](https://jestjs.io/)|
| `tslint` | Static analysis tool that checks TypeScript code for readability |[github](https://www.npmjs.com/package/tslint)|

## Screenshots

WIP 👷‍

## API Documentation

WIP 🚧

## Project Structure

WIP 🏗

***
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

[↑](#0) 👋