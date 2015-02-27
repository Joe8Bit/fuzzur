var assert  = require('assert');
var type    = require('type-detect');
var fuzzer  = require('../src/');
var _       = require('lodash');

describe('The fuzzer', function() {

  describe('should mutate arrays', function() {

    it('when passed directly in', function() {
      var arr = ['aa0u3409', 'bb-03i4r-0i4'];
      var mut = fuzzer.mutate(arr);

      assert.equal(_.find(arr, function(item) {
        return mut.join('').indexOf(item) !== -1;
      }), undefined);

    });

    it('when passed in as a property of an object', function() {
      var obj = {
            arr: ['aa09u4', 'bbo2rui']
          };
      var mut = fuzzer.mutate(obj);

      assert.equal(_.find(obj.arr, function(item) {
        return mut.arr.join('').indexOf(item) !== -1;
      }), undefined);
    });

    it('when they are nested', function() {
      var arr = ['aa', ['bb', 'cc']];
      var mut = fuzzer.mutate(arr);

      assert.equal(_.find(arr[1], function(item) {
        return mut[1].indexOf(item) !== -1;
      }), undefined);
    });

  });

});
