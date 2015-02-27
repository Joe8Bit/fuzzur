var assert  = require('assert');
var type    = require('type-detect');
var fuzzer  = require('../src/');

describe('The fuzzer', function() {

  describe('should mutate strings', function() {

    it('when passed directly in', function() {
      var str = 'oijd0934p';
      assert.notEqual(fuzzer.mutate(str), str);
      assert.equal(fuzzer.mutate(str).length > 0, true);
    });

    it('when passed as a property on an object', function() {
      var obj = {
        str: 'hdf0934'
      };
      assert.notEqual(fuzzer.mutate(obj).str, obj.str);
    });

    it('when passed as an item in an array', function() {
      var obj = ['ljfl'];
      assert.notEqual(fuzzer.mutate(obj)[0], obj[0]);
    });

    it('and make an arbitrary number of randomisation passes', function() {
      var str = 'kuh83';
      var mut = fuzzer.mutate(str, {
            string: {
              randomisationPasses: 50
            }
          });
      assert.equal(mut.length > str.length, true);
    });

    it('and take an arbitrary sample set to mutate strings from', function() {
      var allowedStrings = ['f', 'o', 'o', 'A', 'B'];
      var str = 'foo';
      var sample = 'AB';
      var mut = fuzzer.mutate(str, {
            string: {
              sampleSet: sample
            }
          });

      mut.split('').forEach(function(letter) {
        assert.notEqual(allowedStrings.indexOf(letter), -1);
      });
    });

  });

});
