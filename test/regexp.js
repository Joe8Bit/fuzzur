var assert  = require('assert');
var type    = require('type-detect');
var fuzzer  = require('../src/');

describe('The fuzzer', function() {

  describe('should mutate regexs', function() {

    it('when passed directly in', function() {
      var r = /a-z/gi;
      var r2 = new RegExp(/a-z/gi);
      var fuzzed = fuzzer.mutate(r);
      var fuzzed2 = fuzzer.mutate(r2);

      assert.notEqual(r.toString(), fuzzed.toString());
      assert.notEqual(r2.toString(), fuzzed2.toString());
      assert.equal(type(fuzzed), 'regexp');
      assert.equal(type(fuzzed2), 'regexp');
    });

    it('when passed in as property of object', function() {
      var data = {
            d: /a-z/gi
          };
      var fuzzed = fuzzer.mutate(data);

      assert.notEqual(data.d.toString(), fuzzed.d.toString());
      assert.equal(type(fuzzed.d), 'regexp');
    });

    it('when passed in as array item', function() {
      var data = [new RegExp(/a-z/gi)];
      var fuzzed = fuzzer.mutate(data);

      assert.notEqual(data[0].toString(), fuzzed[0].toString());
      assert.equal(type(fuzzed[0]), 'regexp');
    });

  });

});
