<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p>Generate from <a href="https://github.com/datpp/generator-nestjs-service.git">Yeoman Nestjs Generator</a></p>
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Project Structure
```
.
└── [app-name]
    ├── .husky                      <-- support git hooks (auto format before commit & run test before push)
    ├── src                         <-- business logic
    │   ├── common                  <-- common module
    │   ├── shared                  <-- shared decorator/exception/guards/....
    │   ├── [your-module1]          <-- sample to put your module 1
    │   ├── [your-module2]          <-- sample to put your module 2 
    │   ├── app.config.ts           <-- centralize app config
    │   ├── app.controller.spec.ts  <-- test spec for app controller
    │   ├── app.controller.ts       <-- app controller (like as core controller)
    │   ├── app.module.ts           <-- app module (like as core module)
    │   ├── app.service.ts          <-- app service (like as core service)
    │   └── main.ts                 <-- nestjs main file
    ├── test                        <-- e2e test put here
    │   ├── app.e2e-spec.ts         <-- e2e test for app module
    │   └── jest-e2e.json           <-- jest config e2e                
    ├── .editorconfig               <-- general config for most of editor
    ├── docker-compose.yml          <-- docker compose for Dev env
    ├── Dockerfile                  <-- Dockerfile for build image (use to deploy to staging/beta/production)
    ├── ...
    └── README.md
```

#### Explanation

1. `.husky` - keep the default project githooks (pre-commit - auto format code, pre-push - make sure by pass test before push to remote)
2. `[your-module1]` - created by command `yo nestjs-service:module your-module1` run in nestjs root directory - see more at https://github.com/datpp/generator-nestjs-service (module generator)
3. `app.config.ts` - all config of the app should be put here to help you easy control the configuration for each environment
4. `docker-compose.yml` - support for the developer quick setup local environment
5. `Dockerfile` - support CI/CD build image

#### Database Accessing 
For mongodb express you can access at http://localhost:8081 (make sure run `docker-compose up` first)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
