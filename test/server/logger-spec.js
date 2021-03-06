/* jshint node:true, expr:true */
'use strict';

var _sinon = require('sinon');
var _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));

var expect = require('chai').expect;
var _rewire = require('rewire');

var _appHelper = require('../server-utils/app-helper');
var _configHelper = require('../server-utils/config-helper');
var _loggerHelper = require('../server-utils/logger-helper');
var _logger = null;

describe('[server.logger]', function() {

    var _winstonMock = null;

    beforeEach(function() {
        _configHelper.setConfig('cfg_logs_dir', 'log');

        _winstonMock = _loggerHelper.getWinstonMock();
        _logger = _rewire('../../server/logger');
        _logger.__set__('_winston', _winstonMock);
    });

    afterEach(function() {
        _configHelper.restoreConfig();
    });

    describe('[init]', function() {
        it('should expose the necessary fields and methods', function() {
            expect(_logger).to.have.property('configure').and.to.be.a('function');
            expect(_logger).to.have.property('getLogger').and.to.be.a('function');
        });
    });

    describe('configure()', function() {
        it('should throw an error if invoked without a valid app object', function() {
            var error = 'Invalid app object specified (arg #1)';

            var invokeMethod = function(app) {
                return function() {
                    _logger.configure(app);
                };
            };

            expect(invokeMethod()).to.throw(error);
            expect(invokeMethod(null)).to.throw(error);
            expect(invokeMethod(123)).to.throw(error);
            expect(invokeMethod('abc')).to.throw(error);
            expect(invokeMethod(true)).to.throw(error);
            expect(invokeMethod([])).to.throw(error);
            expect(invokeMethod({})).to.throw(error);
        });

        it('should initialize two loggers for application and access logging when invoked', function() {
            expect(_winstonMock.loggers.add).to.not.have.been.called;

            _logger.configure(_appHelper.getMockApp());

            expect(_winstonMock.loggers.add).to.have.been.calledTwice;
            expect(_winstonMock.loggers.add.args[0][0]).to.equal('app');
            expect(_winstonMock.loggers.add.args[1][0]).to.equal('access');
        });

        it('should have no impact if invoked multiple times', function() {
            _logger.configure(_appHelper.getMockApp());
            _winstonMock.loggers.add.reset();

            _logger.configure(_appHelper.getMockApp());
            expect(_winstonMock.loggers.add).to.not.have.been.called;
        });
    });

    describe('getLogger()', function() {
        it('should throw an error if invoked before the logger has been initialized', function() {
            var error = 'Cannot get logger. Logger has not been initialized';

            expect(function() {
                _logger.getLogger();
            }).to.throw(error);
        });

        it('should throw an error if invoked without the supported logger names', function() {
            var doTest = function(loggerName, throwsError) {
                var error = 'Unsupported logger specified: ' + loggerName;

                var invokeMethod = function() {
                    _logger.configure(_appHelper.getMockApp());
                    return _logger.getLogger(loggerName);
                };

                if (throwsError) {
                    expect(invokeMethod).to.throw(error);
                } else {
                    expect(invokeMethod).to.not.throw(error);
                }
            };

            _logger.configure(_appHelper.getMockApp());
            doTest('abc', true);
            doTest('foo', true);
            doTest('bar', true);

            doTest('app', false);
            doTest('access', false);
        });

        it('should default the logger name to "app" if not specified', function() {
            expect(_winstonMock.loggers.get).to.not.have.been.called;
            _logger.configure(_appHelper.getMockApp());
            _winstonMock.loggers.get.reset();

            _logger.getLogger();

            expect(_winstonMock.loggers.get).to.have.been.calledOnce;
            expect(_winstonMock.loggers.get).to.have.been.calledWith('app');
        });

        it('should return a logger object when invoked', function() {
            _logger.configure(_appHelper.getMockApp());
            var logger = _logger.getLogger();

            expect(logger).to.be.an('object');
            expect(logger).to.have.property('silly').and.to.be.a('function');
            expect(logger).to.have.property('debug').and.to.be.a('function');
            expect(logger).to.have.property('verbose').and.to.be.a('function');
            expect(logger).to.have.property('info').and.to.be.a('function');
            expect(logger).to.have.property('warn').and.to.be.a('function');
            expect(logger).to.have.property('error').and.to.be.a('function');
            expect(logger).to.have.property('log').and.to.be.a('function');
        });
    });
});
