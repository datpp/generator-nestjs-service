"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const dbTypes = require("./db-types");
const projectTypes = require("./project-types");
const _ = require('lodash');

_.extend(Generator.prototype, require('yeoman-generator/lib/actions/install'));

module.exports = class extends Generator {
  constructor(args, opt) {
    super(args, opt)
    this.option('skip-install', {
      default: false,
      type: Boolean
    });
  }

  initializing() {
    // Have Yeoman greet the user.
    this.log(
     yosay(
      `Welcome to the ${chalk.red(
       "nestjs-service"
      )} generator!`
     )
    );
  }

  async prompting() {
    let suffixName = 'app';

    const answerProjectType = await this.prompt([
      {
        type: 'list',
        name: 'projectType',
        message: 'What type of NestJS app do you want to start?',
        choices: projectTypes
      }
    ]);

    if (answerProjectType.projectType !== '01-standalone-app') {
      suffixName = 'service';
    }

    const questionsProjectInfo = [
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        default: `my-awesome-${suffixName}`
      },
      {
        type: "input",
        name: "description",
        message: "Give us some small description of your project",
        default: ""
      },
      {
        type: "input",
        name: "author",
        message: "Who is the author of this project?",
        store: true
      }
    ];

    if (answerProjectType.projectType !== '02-microservice') {
      questionsProjectInfo.push({
        type: "input",
        name: "appPort",
        message: "What port would you like your app to use for local development?",
        default: "3000"
      });
    }

    const answerProjectInfo = await this.prompt(questionsProjectInfo);
    answerProjectInfo.name = answerProjectInfo.name.replace(/\s+/g, '').toLowerCase();

    const questionProjectLib = [
      {
        type: "input",
        name: "useCacheRedis",
        message: "Do you want to use Cache Redis? (Y/N)",
        default: "N"
      },
      {
        type: 'list',
        name: 'dbType',
        message: 'What type of database do you want to use?',
        choices: dbTypes
      }
    ];
    if (answerProjectType.projectType !== '02-microservice') {
      questionProjectLib.push({
        type: "input",
        name: "usePubSub",
        message: "Do you want to use GCP Pubsub? (Y/N)",
        default: "N"
      });
    }
    const answerProjectLib = await this.prompt(questionProjectLib);
    if (answerProjectLib.usePubSub.toLowerCase() === 'y') {
      const anwserGCPInfo = await this.prompt([{
        type: "input",
        name: "ProjectId",
        message: "Enter your GCP projectId:"
      }]);
      answerProjectInfo.GCPProjectId = anwserGCPInfo.ProjectId;
    }

    this.props = {
      answerProjectType,
      answerProjectInfo,
      answerProjectLib
    };
  }

  writing() {
    const pkgJson = {
      devDependencies: {},
      dependencies: {}
    };

    if (this.props.answerProjectLib.useCacheRedis) {
      pkgJson.dependencies['cache-manager'] = '^3.6.0';
      pkgJson.dependencies['cache-manager-redis-store'] = '^2.0.0';
      pkgJson.devDependencies['@types/cache-manager'] = '^3.4.3';
    }

    if (this.props.answerProjectLib.dbType === 'mongoose') {
      pkgJson.dependencies['@nestjs/mongoose'] = '^9.0.2';
      pkgJson.dependencies['mongoose'] = '^6.2.4';

      this.fs.copyTpl(
       this.templatePath(`${this.props.answerProjectType.projectType}/docker-compose-mongoose.yml`),
       this.destinationPath(`${this.props.answerProjectInfo.name}/docker-compose.yml`),
       {
         name: this.props.answerProjectInfo.name,
         description: this.props.answerProjectInfo.description,
         author: this.props.answerProjectInfo.author,
         useCacheRedis: this.props.answerProjectLib.useCacheRedis.toLowerCase() === 'y',
       }
      );
    }
    else if (this.props.answerProjectLib.dbType === 'typeorm') {
      pkgJson.dependencies['@nestjs/typeorm'] = '^8.0.3';
      pkgJson.dependencies['mysql2'] = '^2.3.3';
      pkgJson.dependencies['typeorm'] = '^0.2.44';

      this.fs.copyTpl(
       this.templatePath(`${this.props.answerProjectType.projectType}/docker-compose-typeorm.yml`),
       this.destinationPath(`${this.props.answerProjectInfo.name}/docker-compose.yml`),
       {
         name: this.props.answerProjectInfo.name,
         description: this.props.answerProjectInfo.description,
         author: this.props.answerProjectInfo.author,
         useCacheRedis: this.props.answerProjectLib.useCacheRedis.toLowerCase() === 'y',
       }
      );
    }
    else {
      this.fs.copyTpl(
       this.templatePath(`${this.props.answerProjectType.projectType}/docker-compose-none.yml`),
       this.destinationPath(`${this.props.answerProjectInfo.name}/docker-compose.yml`),
       {
         name: this.props.answerProjectInfo.name,
         description: this.props.answerProjectInfo.description,
         author: this.props.answerProjectInfo.author,
         useCacheRedis: this.props.answerProjectLib.useCacheRedis.toLowerCase() === 'y',
       }
      );
    }

    if (this.props.answerProjectLib.usePubSub.toLowerCase() === 'y') {
      pkgJson.dependencies['@nestjs/microservices'] = '^8.4.4';
      pkgJson.dependencies['@algoan/pubsub'] = '^4.6.3';
      pkgJson.dependencies['@algoan/nestjs-google-pubsub-client'] = '^0.4.1';

      if (this.props.answerProjectType.projectType === '02-microservice') {
        pkgJson.dependencies['@algoan/nestjs-google-pubsub-microservice'] = '^3.0.2';
      }
    }

    if (this.props.answerProjectType.projectType === '04-clean-architect') {
      pkgJson.dependencies["@nestjs/event-emitter"] = "^1.1.0";
      pkgJson.dependencies["@prisma/client"] = "^3.10.0";
      pkgJson.dependencies["@nestjs/cqrs"] = "^8.0.3";
      pkgJson.dependencies["fp-ts"] = "^2.11.9";
      pkgJson.dependencies["io-ts"] = "^2.2.16";
      pkgJson.dependencies["io-ts-types"] = "^0.5.16";
      pkgJson.dependencies["nestjs-pino"] = "^2.5.0";
      pkgJson.dependencies["pino"] = "^7.8.1";
      pkgJson.dependencies["prisma"] = "^3.10.0";
      pkgJson.dependencies["runtypes"] = "^6.5.1";
    }

    // Copy main.ts
    this.fs.copyTpl(
     this.templatePath(`${this.props.answerProjectType.projectType}/src/main.ts`),
     this.destinationPath(`${this.props.answerProjectInfo.name}/src/main.ts`),
     {
       useTypeORM: this.props.answerProjectLib.dbType === 'typeorm',
       useMongoose: this.props.answerProjectLib.dbType === 'mongoose',
       useCacheRedis: this.props.answerProjectLib.useCacheRedis.toLowerCase() === 'y',
       usePubSub: this.props.answerProjectLib.usePubSub.toLowerCase() === 'y',
       appName: this.props.answerProjectInfo.name,
       appDescription: this.props.answerProjectInfo.description,
     }
    );

    // Copy test files
    this.fs.copyTpl(
     this.templatePath(`${this.props.answerProjectType.projectType}/test/**/*`),
     this.destinationPath(`${this.props.answerProjectInfo.name}/test`),
     {
       appName: this.props.answerProjectInfo.name,
     }
    );

    // Copy config files
    // 3rd party config
    this.fs.copy(
     this.templatePath(`${this.props.answerProjectType.projectType}/.*`),
     this.destinationPath(`${this.props.answerProjectInfo.name}`)
    );

    // initial git to allow add git hook to project
    this.fs.copy(
     this.templatePath(`${this.props.answerProjectType.projectType}/.git-tpl/**/*`),
     this.destinationPath(`${this.props.answerProjectInfo.name}/.git`)
    );

    // husky - support quickly implement git hook
    this.fs.copy(
     this.templatePath(`${this.props.answerProjectType.projectType}/.husky/**/*`),
     this.destinationPath(`${this.props.answerProjectInfo.name}/.husky`)
    );

    this.fs.copy(
     this.templatePath(`${this.props.answerProjectType.projectType}/nest-cli.json`),
     this.destinationPath(`${this.props.answerProjectInfo.name}/nest-cli.json`)
    );

    this.fs.copy(
     this.templatePath(`${this.props.answerProjectType.projectType}/README.md`),
     this.destinationPath(`${this.props.answerProjectInfo.name}/README.md`)
    );

    this.fs.copyTpl(
     this.templatePath(`${this.props.answerProjectType.projectType}/package.json`),
     this.destinationPath(`${this.props.answerProjectInfo.name}/package.json`),
     {
       name: this.props.answerProjectInfo.name,
       description: this.props.answerProjectInfo.description,
       author: this.props.answerProjectInfo.author
     }
    );

    this.fs.copy(
     this.templatePath(`${this.props.answerProjectType.projectType}/tsconfig.json`),
     this.destinationPath(`${this.props.answerProjectInfo.name}/tsconfig.json`)
    );

    this.fs.copy(
     this.templatePath(`${this.props.answerProjectType.projectType}/tsconfig.build.json`),
     this.destinationPath(`${this.props.answerProjectInfo.name}/tsconfig.build.json`)
    );

    // Copy app module
    this.fs.copyTpl(
     this.templatePath(`${this.props.answerProjectType.projectType}/src/app.*`),
     this.destinationPath(`${this.props.answerProjectInfo.name}/src`),
     {
       useTypeORM: this.props.answerProjectLib.dbType === 'typeorm',
       useMongoose: this.props.answerProjectLib.dbType === 'mongoose',
       useCacheRedis: this.props.answerProjectLib.useCacheRedis.toLowerCase() === 'y',
       usePubSub: this.props.answerProjectLib.usePubSub.toLowerCase() === 'y',
       GCPProjectId: this.props.answerProjectInfo.GCPProjectId || '',
       appName: this.props.answerProjectInfo.name,
       appDescription: this.props.answerProjectInfo.description,
       appPort: this.props.answerProjectInfo.appPort,
     }
    );

    // for common module, generate folder structure
    this.fs.copy(
     this.templatePath(`${this.props.answerProjectType.projectType}/src/common/**/*`),
     this.destinationPath(`${this.props.answerProjectInfo.name}/src/common`)
    )

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath(`${this.props.answerProjectInfo.name}/package.json`), pkgJson);
  }

  install() {
    if (this.options['skip-install']) {
      this.log(chalk.green(`
        To install dependencies, run
        ${chalk.white('$')} cd ${this.props.answerProjectInfo.name}/
        ${chalk.white('$')} yarn install
      `));
    } else {
      var npmdir = `${process.cwd()}/${this.props.answerProjectInfo.name}`;
      this.yarnInstall([], {}, {cwd: npmdir});
    }
  }

  end() {
    if (!this.options['skip-install']) {
      var npmdir = `${process.cwd()}/${this.props.answerProjectInfo.name}`;
      this.spawnCommand('npm', ['run', 'lint'], {cwd: npmdir});
    }
  }
};
