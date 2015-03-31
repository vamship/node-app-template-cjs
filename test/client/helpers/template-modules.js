/* jshint node:true */

/**
 * Placeholder template module that will be loaded when testing built files.
 * When testing in dev mode, the contents of this file will be generated by
 * ngHtml2JsPreprocessor.
 */
'use strict';

var modulesToEnsure = ['karma_templates', 'templates'];
modulesToEnsure.forEach(function(moduleName) {
    try {
        angular.module(moduleName);
        console.log('Module exists: [' + moduleName + ']');
    } catch (ex) {
        angular.module(moduleName, []);
        console.debug('New module created: [' + moduleName + ']');
    }
});

module.exports = modulesToEnsure;
