var semver = require('semver');
var _ = require('lodash');
var agent = require('superagent');

var SEMVER = /[0-9]+\.[0-9]+\.[0-9]+(-rc[0-9]+)?/g;
var TIMEOUT = 20000;
var NOOP = function() {};

function MongoDBSource(options) {
  _.extend(this, {
    name: 'mongodb',
    url: 'localhost:4593/mongodb',
    all: [],
    stable: [],
    updated: undefined
  }, options);
}

MongoDBSource.prototype.update = function(done) {
  done = done || NOOP;

  return agent.get(this.url)
    .timeout(TIMEOUT)
    .end(parseResponse.bind(this));

  function parseResponse(err, res) {
    if (err) {
      return done(err, false);
    }
    if (!res.text) {
      return done(new Error('No response'), false);
    }
    if (res.status !== 200) {
      return done(new Error('Bad response'), false);
    }

    this._parse(res.text);

    return done(undefined, true);
  }
};

MongoDBSource.prototype._parse = function(body) {
  var matches = body.match(SEMVER);
  var versions = _.unique(matches);

  this.all = versions.sort(semver.compare);
  this.stable = versions.filter(function(version) {
    return semver(version).prerelease.length === 0;
  });
  this.updated = new Date();
};

module.exports = MongoDBSource;
