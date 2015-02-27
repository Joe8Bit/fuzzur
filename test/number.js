var assert  = require('assert');
var type    = require('type-detect');
var fuzzer  = require('../src/');

describe('The fuzzer', function() {

  function isInt(num) {
    return num % 1 === 0;
  }

  describe('should mutate numbers', function() {

    it('when passed directly in', function() {
      var inte = 12;
      var flt = 12.34;
      var intMut = fuzzer.mutate(inte);
      var fltMut = fuzzer.mutate(flt);

      assert.notEqual(inte, intMut);
      assert.equal(isInt(intMut), true);

      assert.notEqual(flt, fltMut);
      assert.equal(isInt(fltMut), false);

      assert.equal(type(intMut), 'number');
      assert.equal(type(fltMut), 'number');
    });

    it('when passed as an object property', function() {
      var inte = {
            foo: 12
          };
      var flt = {
            bar: 12.34
          };
      var intMut = fuzzer.mutate(inte);
      var fltMut = fuzzer.mutate(flt);

      assert.notEqual(inte.foo, intMut.foo);
      assert.equal(isInt(intMut.foo), true);

      assert.notEqual(flt.bar, fltMut.bar);
      assert.equal(isInt(fltMut.bar), false);

      assert.equal(type(intMut.foo), 'number');
      assert.equal(type(fltMut.bar), 'number');
    });

    it('when passed as an array item', function() {
      var inte = {
            foo: 12
          };
      var flt = {
            bar: 12.34
          };
      var intMut = fuzzer.mutate(inte);
      var fltMut = fuzzer.mutate(flt);

      assert.notEqual(inte.foo, intMut.foo);
      assert.equal(isInt(intMut.foo), true);

      assert.notEqual(flt.bar, fltMut.bar);
      assert.equal(isInt(fltMut.bar), false);

      assert.equal(type(intMut.foo), 'number');
      assert.equal(type(fltMut.bar), 'number');
    });

    it('and return a number between a custom min and max value', function() {
      var data = fuzzer.mutate(4, {
        number: {
          integer: {
            min: 4,
            max: 10
          }
        }
      });
      assert(data <= 10 && data >= 4, true);
    });

  });

});
