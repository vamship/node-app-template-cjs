/**
 * Entry point for the javascript application. Initializes all required modules
 * and ui routes.
 */
'use strict';

var console = require('console');
var angular = require('angular');
var angularMaterial = require('angular-material');
var uiRouter = require('angular-ui-router');

var routes = require('./routes');
var templates = require('./templates');
var coreModule = require('./app.core');
var authModule = require('./app.auth');
var moduleName = 'app';

angular.module(moduleName, [
    templates,
    'ngMaterial',
    'ui.router',
    coreModule,
    authModule
]).config(routes) // Route configuration
.controller('app.layout.MasterLayoutController', [ '$scope', function($scope) {
}]);

//angular.bootstrap(document, [moduleName]);
console.info('Application ready');
