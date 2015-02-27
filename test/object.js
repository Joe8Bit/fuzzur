var assert  = require('assert');
var type    = require('type-detect');
var fuzzer  = require('../src/');
var _       = require('lodash');

describe('The fuzzer', function() {

  describe('should mutate object', function() {

    it('when passed directly in', function() {
      var obj = {
            foo: 'bar'
          };
      var mut = fuzzer.mutate(obj);

      assert.notEqual(obj.foo, mut.foo);
      assert.equal(type(mut), 'object');
    });

    it('when passed in as an item in an array', function() {
      var arr = ['023948', {
            foo: 'bar'
          }];
      var mut = fuzzer.mutate(arr);

      assert.notEqual(arr[1].foo, mut[1].foo);
      assert.equal(type(arr[1]), 'object');
    });

    it('when they are nested', function() {
      var obj = {
            foo: 'bar',
            baz: {
              blork: 'grump'
            }
          };
      var mut = fuzzer.mutate(obj);

      assert.notEqual(obj.baz.blork, mut.baz.blork);
      assert.equal(type(obj.baz), 'object');
    });

  });

});
