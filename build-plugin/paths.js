var path = require('path');
var fs = require('fs');
var assign = Object.assign || require('object.assign');

var userPath;
try {
	userPath = require('../paths');
} catch(_) {
	console.info('No user paths.js found.')
}

// hide warning //
var emitter = require('events');
emitter.defaultMaxListeners = 5;

var appRoot = '../src/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

var paths = {
  root: appRoot,
  source: appRoot + '**/*.js',
  style: 'styles/**/*.css',
  output: 'dist/',
  doc:'./doc',
  theme: './node_modules/typedoc-markdown-theme/bin',
  test: 'test/**/*.js',
  exampleSource: 'doc/example/',
  exampleOutput: 'doc/example-dist/',
  packageName: pkg.name,
  ignore: [],
  useTypeScriptForDTS: false,
  importsToAdd: [],           	// eg. non-concated local imports in the main file as
								// they will get removed during the build process
  importsToIgnoreForDts: [], 	// imports that are only used internally.
								// no need to d.ts export them
  jsResources: [appRoot + 'components/'], // js to be transpiled, but not be concated 
										  // and keeping their relative path
  resources: appRoot + '{**/*.css,**/*.html}',
  sort: true,
  concat: true
};

// files to be transpiled (and concated if selected)
paths.mainSource = [paths.source].concat(paths.jsResources.map(function(resource) {return '!' + resource;}));

// files to be linted
paths.lintSource = paths.source;

module.exports = paths;
