'use strict';

var console = require('console');
var angular = require('angular');

/**
 * Module that provides data access components for the application. This
 * includes abstracted data access objects, long pollers, etc.
 * 
 * The components defined by this module may be extended and/or augmented 
 * as necessary.
 */
var moduleName = 'app.data';
angular.module(moduleName, [ ])
    .factory('app.data.RestDataSource', require('./services/rest-data-source'))
    ;

console.debug('Module loaded: [' + moduleName + ']');
module.exports = moduleName;