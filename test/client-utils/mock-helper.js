/* jshint node:true, expr:true */
'use strict';

var _clone = require('clone');
var _sinon = require('sinon');

/**
 * Test helper that generates different mocks for client side testing
 *
 * @module test.clientUtils.mockHelper
 */
module.exports = {
    /**
     * Creates and returns a config mock, initialized with the specified
     * config values.
     *
     * @module test.clientUtils.mockHelper
     * @method createConfigMock
     * @param {Object} [config={}] An object representing the config values
     *          populated into the mock.
     */
    createConfigMock: function(config) {
        config = _clone(config);
        if(!config || typeof config !== 'object') {
            config = {};
        };

        var mock = {
            get: function(prop) {
                return mock.__config[prop];
            },
            set: function(prop, value) {
                mock.__config[prop] = value;
            },
            __config: config
        };
        return mock;
    },

    /**
     * Creates and returns a local storage mock that mocks angular
     * local storage's functionality.
     *
     * @module test.clientUtils.mockHelper
     * @method createLocalStorageMock
     * @param {Boolean} [isSupported=false] A boolean object that specifies whether
     *          or not local storage is available.
     * @param {Object} [settings={}] A settings object that represents the backing
     *          local storage store.
     * @return {Object} A mock object for angular-local-storage
     */
    createLocalStorageMock: function(isSupported, settings) {
        isSupported = !!isSupported;
        settings = _clone(settings);
        if(!settings || typeof settings !== 'object') {
            settings = {};
        };

        var mock = {
            isSupported: isSupported,
            get: function(key) {
                return mock.__settings[key];
            },
            set: function(key, value) {
                mock.__settings[key] = value;
            },
            __settings: settings
        };

        return mock;
    },

    /**
     * Creates a mock of the ui router's $state service.
     *
     * @module test.clientUtils.mockHelper
     * @method createUiRouterStateMock
     * @param {String} [url=''] The url that will be returned by the state mock.
     * @return {Object} A mock object for the UI router state
     */
    createUiRouterStateMock: function(url) {
        if(!typeof url !== 'string') {
            url = '';
        }
        var mock = {
            __url: url,
            href: function() {}
        };

        _sinon.stub(mock, 'href', function(state, params) {
            return mock.__url;
        });

        return mock;
    },

    /**
     * Creates a mock of the client side user object
     *
     * @module test.clientUtils.mockHelper
     * @method createUserMock
     * @param {String} [username='jdoe'] The username of the user represented by the mock
     * @param {Array} [roles=[]] An array of roles that the user belongs to
     * @return {Object} A mock object for the user
     */
    createUserMock: function(username, roles) {
        if(!typeof username !== 'string') {
            username = 'jdoe';
        }
        if(!(roles instanceof Array)) {
            roles = [];
        }

        var mock = {
            _isLoggedIn: false,
            _roles: _clone(roles),
            username: _clone(username),
            hasRole: function(role) {
                return mock._roles.indexOf(role.toLowerCase()) >= 0;
            },
            isLoggedIn: function() {
                return mock._isLoggedIn;
            }
        };

        return mock;
    }
};
