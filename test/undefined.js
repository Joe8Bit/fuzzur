var assert  = require('assert');
var type    = require('type-detect');
var fuzzer  = require('../src/');

describe('The fuzzer', function() {

  describe('should not mutate undefined', function() {

    it('it should just return undefined when called directly', function() {
      assert.equal(fuzzer.mutate(undefined), undefined);
    });

    it('it should just return undefined when called as object property', function() {
      var foo = {
        bar: undefined
      };
      assert.equal(fuzzer.mutate(foo).bar, foo.bar);
    });

    it('it should just return undefined when called as array item', function() {
      var foo = [undefined];
      assert.equal(fuzzer.mutate(foo)[0], foo[0]);
    });

  });

});
