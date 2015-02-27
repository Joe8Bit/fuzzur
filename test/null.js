var assert  = require('assert');
var type    = require('type-detect');
var fuzzer  = require('../src/');

describe('The fuzzer', function() {

  describe('should not mutate null', function() {

    it('it should just return null when called directly', function() {
      assert.equal(fuzzer.mutate(null), null);
    });

    it('it should just return null when called as object property', function() {
      var foo = {
        bar: null
      };
      assert.equal(fuzzer.mutate(foo).bar, foo.bar);
    });

    it('it should just return null when called as array item', function() {
      var foo = [null]
      assert.equal(fuzzer.mutate(foo)[0], foo[0]);
    });

  });

});
