process.env.NODE_ENV = 'test'

assert = require "assert"
semver = require "semver"
fs = require "fs"

Source = require "../../lib/sources/npm"
json = require "../fixtures/npm.json"

describe "Npm Source", ->

  describe "default properties", ->

    before ->
      this.s = new Source()

    it "defaults to empty all array", ->
      assert.equal this.s.all.length, 0

    it "default to empty stable array", ->
      assert.equal this.s.stable.length, 0

    it "has never been updated", ->
      assert.ok !this.s.updated

  describe "_parse()", ->

    before ->
      this.s = new Source()
      this.s._parse(json)

    it "has an array of all versions", ->
      assert.equal typeof(this.s.all), "object"
      assert.equal this.s.all.length, 99

    it "shows version 2.1.12 as the latest unstable", ->
      assert.equal this.s.all[98], '2.1.12'

    it "has an array of stable versions", ->
      assert.equal typeof(this.s.stable), "object"
      assert.equal this.s.stable.length, 98

    it "shows version 2.1.11 as the latest stable", ->
      assert.equal this.s.stable[97], '2.1.11'

    it "has been updated", ->
      assert.ok this.s.updated
