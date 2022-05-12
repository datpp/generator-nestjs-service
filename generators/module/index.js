"use strict";
const Generator = require("yeoman-generator");
const rename = require("gulp-rename");
const kebabToPascal = require('../../utils/case-change').kebabToPascal;
const kebabToCamel = require('../../utils/case-change').kebabToCamel;
const toLower = require('../../utils/case-change').toLower;
const moduleTypes = require('./module-types');
const chalk = require("chalk");

module.exports = class extends Generator {
  constructor(args, opt) {
    super(args, opt);

    this.argument('name', {
      required: true,
      description: "The name of the module to create",
      type: String
    });

    this.option('use-alias', {
      default: false,
      type: Boolean
    });

    this.myConfig = {};
  }

  async prompting() {
    if (this.fs.exists(this.destinationPath(`package.json`))) {
      this.packageJSON = this.fs.readJSON(this.destinationPath(`package.json`));
      if (this.packageJSON && !this.packageJSON.dependencies['@nestjs/core']) {
        this.packageJSON = null;
      }
    }

    if (!this.packageJSON) {
      this.log(`${chalk.red(
       "You should run this command in nestjs project directory root!"
      )}`);

      return;
    }

    // check db type
    const libs = Object.keys(this.packageJSON.dependencies);
    if (libs && libs.indexOf('typeorm') !== -1) {
      this.myConfig.dbType = 'typeorm';
    }
    else if (libs && libs.indexOf('mongoose') !== -1) {
      this.myConfig.dbType = 'mongo';
    }
    else {
      this.myConfig.dbType = 'none';
    }

    if (this.packageJSON.keywords && this.packageJSON.keywords.indexOf('clean-architect') !== -1) {
      this.log(`${chalk.green(
       "Clean Architect Project Detected!!! Module structure automatic generate with clean architect structure"
      )}`);
      this.myConfig.type = '00-clean-architect'; // force to use clean architect in module
                                                 // if project structure is clean architect
    }

    let name = this.options['name'];
    this.myConfig.name = name.endsWith('s') ? name.substr(0, name.length - 1) : name;

    if (!this.myConfig.type) { // only allow select level of structure in case project is not clean-architect structure
      const answerModuleType = await this.prompt([
        {
          type: 'list',
          name: 'name',
          message: 'What is level of structure do you want?',
          choices: moduleTypes
        }
      ]);

      this.myConfig.type = answerModuleType.name;
    }

    const answerAuthor = await this.prompt([
      {
        type: "input",
        name: "author",
        message: "Who is the author of this module?",
        store: true
      }
    ]);

    this.myConfig.author = answerAuthor.author;
  }

  writing() {
    if (!this.packageJSON) return;
    var _this = this;

    let { name, type } = this.myConfig
    let templateOptions = { kebabToCamel, kebabToPascal, toLower, config: this.myConfig, useMongoose: this.myConfig.dbType === 'mongo', useTypeORM: this.myConfig.dbType === 'typeorm' }

    this.queueTransformStream(rename(function (path) {
      path.basename = path.basename.replace('__moduleName__', _this.myConfig.name.toLowerCase());
    }))

    // copy .gitkeep
    this.fs.copyTpl(
     this.templatePath(`${type}/**/.*`),
     this.destinationPath(`src/${name}`),
     templateOptions
    );

    // copy modudule files
    this.fs.copyTpl(
     this.templatePath(`${type}/**/*.*`),
     this.destinationPath(`src/${name}`),
     templateOptions
    );

    this.fs.copyTpl(
     this.templatePath(`${type}/README.md`),
     this.destinationPath(`src/${name}/README.md`),
     templateOptions
    );

    // remove unrelated data
    if (this.myConfig.dbType === 'typeorm') {
      this.fs.delete(this.destinationPath(`src/${name}/schemas/**/.*`));
      this.fs.delete(this.destinationPath(`src/${name}/schemas/**/*.*`));
    }
    else if(this.myConfig.dbType === 'mongo') {
      this.fs.delete(this.destinationPath(`src/${name}/entities/**/.*`));
      this.fs.delete(this.destinationPath(`src/${name}/entities/**/*.*`));
    }
    else {
      this.fs.delete(this.destinationPath(`src/${name}/schemas/**/.*`));
      this.fs.delete(this.destinationPath(`src/${name}/schemas/**/*.*`));
      this.fs.delete(this.destinationPath(`src/${name}/entities/**/.*`));
      this.fs.delete(this.destinationPath(`src/${name}/entities/**/*.*`));
    }

    // create alias for module in tsconfig
    // disable by default because this is advance feature
    // yeoman will ask for resolve conflict in tsconfig.json
    if (this.options['use-alias']) {
      const tsConfig = {
        compilerOptions: {
          "paths": {}
        }
      };
      tsConfig.compilerOptions.paths[`@${name}`] = [`src/${name}`];
      tsConfig.compilerOptions.paths[`@${name}/*`] = [`src/${name}/*`];

      this.fs.extendJSON(this.destinationPath(`tsconfig.json`), tsConfig);
    }
  }

  // end() {
  //   if (!this.options['skip-install']) {
  //     var npmdir = `${process.cwd()}`;
  //     this.spawnCommand('npm', ['run', 'lint'], {cwd: npmdir});
  //   }
  // }
};
