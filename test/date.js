var assert  = require('assert'),
    type    = require('type-detect'),
    fuzzer  = require('../src/');

describe('The fuzzer', function() {

  describe('should mutate dates', function() {

    it('when passed directly in', function() {
      var d = new Date(),
          fuzzed = fuzzer.mutate(d);

      assert.notEqual(d.getTime(), fuzzed.getTime());
      assert.equal(type(fuzzed), 'date');
    });

    it('when passed in as property of object', function() {
      var data = {
            d: new Date()
          },
          fuzzed = fuzzer.mutate(data);

      assert.notEqual(data.d.getTime(), fuzzed.d.getTime());
      assert.equal(type(fuzzed.d), 'date');
    });

    it('when passed in as array item', function() {
      var data = [new Date()]
          fuzzed = fuzzer.mutate(data);

      assert.notEqual(data[0].getTime(), fuzzed[0].getTime());
      assert.equal(type(fuzzed[0]), 'date');
    });

  });

});