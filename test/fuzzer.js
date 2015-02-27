var assert  = require('assert');
var type    = require('type-detect');
var fuzzer  = require('../src/');

describe('The fuzzer', function() {

  it('should expose the correct public method', function() {
    assert.equal(typeof fuzzer.mutate, 'function');
  });

});
