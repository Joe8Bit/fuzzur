var assert  = require('assert');
var type    = require('type-detect');
var fuzzer  = require('../src/');

describe('The fuzzer', function() {

  describe('should not mutate functions', function() {

    it('it should should just return the same function when called directly', function() {
      var fn = function() {};
      assert.equal(fuzzer.mutate(fn).toString(), fn.toString());
    });

    it('it should should just return the same function when called as object property', function() {
      var foo = {
        fn: function() {}
      };
      assert.equal(fuzzer.mutate(foo).fn.toString(), foo.fn.toString());
    });

    it('it should should just return the same function when called as array item', function() {
      var foo = [function() {}]
      assert.equal(fuzzer.mutate(foo)[0].toString(), foo[0].toString());
    });

  });

});
