var assert  = require('assert'),
    type    = require('type-detect'),
    fuzzer  = require('../src/');

describe('The fuzzer', function() {

  it('should expose the correct public method', function() {
    assert.equal(typeof fuzzer.mutate, 'function');
  });

});