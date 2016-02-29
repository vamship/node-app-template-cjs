/**
 * Module that defines themes and theme related settings for the application.
 *
 * Exports an array that includes necessary dependencies, which can then be
 * directly used in an application initialization routine.
 *
 * @module app.themes
 */
'use strict';

var console = require('console');

module.exports = [ '$mdThemingProvider',
    function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('blue-grey', {
          })
          .accentPalette('pink', {
          })
          ;

        console.debug('Themes configured');
    }
];
