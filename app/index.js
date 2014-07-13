'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var ChromeappCoffeeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous ChromeappCoffee generator!'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  git: function() {
    this.copy('gitignore', '.gitignore');
  },

  gulp: function() {
    this.copy('gulpfile.coffee', 'gulpfile.coffee');
  },

  bower: function() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
  },

  packageJSON: function() {
    this.template('_package.json', 'package.json', this);
  },

  app: function () {

    this.mkdir('app');
    this.mkdir('app/bower_components');
    this.directory('assets', 'app/assets');

    this.mkdir('src');
    this.copy('background.coffee', 'src/background.coffee');
    this.copy('index.coffee', 'src/index.coffee');
    this.copy('index.jade', 'src/index.jade');
    this.copy('style.styl', 'src/style.styl');
    this.copy('manifest.yml', 'src/manifest.yml');
    this.template('_locales/en/messages.yml', 'src/_locales/en/messages.yml', this);

  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = ChromeappCoffeeGenerator;
