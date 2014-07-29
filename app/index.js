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
      name: 'appName',
      message: 'What would you like to call this application?',
      default: (this.appname) ? this.appname : 'Chrome App'
    }, {
      name: 'appDescription',
      message: 'How would you like to describe this application?',
      default: 'My Chrome App'
    }];

    this.prompt(prompts, function (props) {
      var encode = function(str) {return str && str.replace(/\"/g, '\\"');};
      this.appName = encode(props.appName);
      this.appDescription = encode(props.appDescription);

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
    this.copy('_bower.json', 'bower.json');
    this.copy('_bowerrc', '.bowerrc');
  },

  packageJSON: function() {
    this.template('_package.json', 'package.json', this);
  },

  app: function () {

    this.mkdir('app');
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
