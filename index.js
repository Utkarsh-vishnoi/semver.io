if (process.env.NODE_ENV === 'production') require('newrelic');
var log = require('./lib/logger');
var App = require('./lib/app');
var express = require('express');

var PORT_A = process.env.PORT || 5000;
var PORT_B = process.env.PORT || 4593;

var app = new App();


app.listen(PORT_A, function onListen() {
  log({ message: 'Semver.IO listening on', port: PORT_A });
});

var serve = express();

// serve.use('/', serveIndex('./', {'icons': true}));

serve.get('/nodejs', function(req, res) {
    res.sendFile('/nodejs.html', {root: __dirname })
});

serve.get('/iojs', function(req, res) {
    res.sendFile('/iojs.html', {root: __dirname })
});

serve.get('/registry/yarn', function(req, res) {
    res.sendFile('/yarn.html', {root: __dirname })
});

serve.get('/registry/npm', function(req, res) {
    res.sendFile('/npm.html', {root: __dirname })
});

serve.get('/mongodb', function(req, res) {
    res.sendFile('/mongodb.html', {root: __dirname })
});

serve.get('/nginx', function(req, res) {
    res.sendFile('/nginx.html', {root: __dirname })
});

serve.listen(PORT_B, function onListen() {
  log({ message: 'Cache server listening on', port: PORT_B });
});