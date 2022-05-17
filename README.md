# generator-nestjs-service
> 

## Introduction 
Build with love and passion with NestJs and 12factor.net, Also support kind of project for Clean Architect from https://github.com/VincentJouanne/nest-clean-architecture

In case you love this also, so you can: 

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/datpp)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-nestjs-service using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-nestjs-service
```

Then generate your new project:

```bash
yo nestjs-service
```

Generate new module:

```bash
yo nestjs-service:module [module-name]      # require run from root nestjs project
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## Getting to Know Project Structure

 * This generator has 4 kinds (for first release I just support the standalone one, the others will come later) of project structure and 3 kinds of module structure.
 * In each structure, you will found the README.md which describes the structure detail.
 
## Check List
### Project structure supports
- [x] standalone app
- [ ] microservice
- [ ] hybrid app
- [ ] clean architect

### Module structure support
#### Clean Architect - TBD
#### Basic - Minimal
- [x] default controller
- [x] default dto request/response/response with paging
- [x] default service
- [x] default entity (with TypeORM)
- [x] default schema (with Mongoose)
#### Basic - Full
- [x] default controller
- [x] default dto request/response/response with paging
- [x] default service
- [x] default entity (with TypeORM)
- [x] default schema (with Mongoose)
- [x] default decorator
- [x] default exception
- [x] default guard
- [x] default interceptor
- [x] default middleware
- [x] default pipe

## Change Log 
- https://github.com/datpp/generator-nestjs-service/blob/main/CHANGELOG.md

## License
MIT - https://opensource.org/licenses/MIT
