var path = require('path');
var paths = require('./paths');

var pluginPath = process.cwd() + '/node_modules/spoonx-tools/node_modules/';

exports.base = function() {
  var config = {
    filename: '',
    filenameRelative: '',
    sourceMap: true,
    sourceRoot: process.cwd() + '/node_modules/spoonx-build',
    moduleRoot: path.resolve(paths.root).replace(/\\/g, '/'),
    moduleIds: false,
    comments: false,
    compact: false,
    code: true,
    presets: [
      pluginPath +'babel-preset-es2015-loose',
      pluginPath + 'babel-preset-stage-1'
    ],
    plugins: [
      pluginPath + 'babel-plugin-syntax-flow',
      pluginPath + 'babel-plugin-transform-decorators-legacy',
    ]
  };
  if (!paths.useTypeScriptForDTS) {
    config.plugins.push(
      [pluginPath + 'babel-dts-generator', {
          packageName: paths.packageName,
          typings: '',
          suppressModulePath: true,
          suppressComments: false,
          memberOutputFilter: /^_.*/,
          suppressAmbientDeclaration: true
      }]
    );
  };
  config.plugins.push(pluginPath + 'babel-plugin-transform-flow-strip-types');
  return config;
}

exports.commonjs = function() {
  var options = exports.base();
  options.plugins.push(pluginPath + 'babel-plugin-transform-es2015-modules-commonjs');
  return options;
};

exports.amd = function() {
  var options = exports.base();
  options.plugins.push(pluginPath + 'babel-plugin-transform-es2015-modules-amd');
  return options;
};

exports.system = function() {
  var options = exports.base();
  options.plugins.push(pluginPath + 'babel-plugin-transform-es2015-modules-systemjs');
  return options;
};

exports.es2015 = function() {
  var options = exports.base();
  options.presets = [pluginPath + 'babel-preset-stage-1']
  return options;
};

exports['native-modules'] = function() {
  var options = exports.base();
  options.presets[0] = pluginPath + 'babel-preset-es2015-loose-native-modules';
  return options;
}
