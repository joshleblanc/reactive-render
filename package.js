Package.describe({
  name: 'reactive-render',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: "A decorator to make a react component's render function reactive",
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/joshleblanc/reactive--render',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.1');
  api.use('ecmascript');
  api.mainModule('reactive-render.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('reactive-render');
  api.mainModule('reactive-render-tests.js');
});
