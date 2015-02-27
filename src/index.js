'use strict';

var type  = require('type-detect');
var _     = require('lodash');
var merge = require('deepmerge');

/**
 * The public mutate method, takes data, mutates it and returns a mutate copy
 * @param  {Any} data Any data format
 * @param  {Object} config An options block, that corressponds to the defaults laid out below
 * @return {Any}      Returns whatever data type the function is called with
 */
function mutate(data, config) {
  var _mutateInstance = new MutateData(data, (config || {}));
  var typeOf = type(data);

  return _mutateInstance[typeOf]();
}

/**
 * The mutation constructor
 * @param  {Any} data Any data format
 * @param  {Object} config A config block that corresponds to the defaults below, and overrides them
 */
function MutateData(data, config) {
  this.data = data;
  this.defaults = {
    string: {
      sampleSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      randomisationPasses: 10
    },
    number: {
      integer: {
        min: -1000,
        max: 10000
      },
      float: {
        min: -1000,
        max: 10000,
        arbitraryPrecision: 2
      }
    },
    date: {
      endYear: 2022
    }
  };
  this.config = merge(this.defaults, config);
}

/**
 * Recursivley mutates an object and returns a copy with it's values mutated in place
 * @param  {Object} obj The object to mutte
 * @return {Object}     The mutates object, a copy of the mutator
 */
MutateData.prototype.object = function(obj) {
  var _this = this;
  var copy = _.extend({}, (obj || this.data));

  Object.keys(copy).forEach(function(key) {
    copy[key] = _this[type(copy[key])](copy[key]);
  });

  return copy;
};

/**
 * Recursivley mutate an array and it's contents
 * @param  {Array} arr The array to mutate
 * @return {Array}     The mutated array
 */
MutateData.prototype.array = function(arr) {
  var _this = this;
  var mutator = arr || this.data;

  return _.map(mutator, function(item) {
    return _this[type(item)](item);
  });
};

/**
 * Mutate a string
 * @param  {String} str The string to mutate
 * @return {String}     The mutated string
 */
MutateData.prototype.string = function(str) {
  var mutator = str || this.data;
  var split = mutator.split('');
  var passes = _.random(1, this.config.string.randomisationPasses);
  var i;

  for (i = 0; i < passes; i++) {
    split.splice(_.random(0, split.length), 0, this.config.string.sampleSet.split('')[_.random(0, this.config.string.sampleSet.length)]);
  }

  return _.shuffle(split).join('');
};

/**
 * Mutate a number, if it's a float, return a mutated float and the same for int's
 * @param  {Number} num The Number to mutate
 * @return {Number}     The mutated number
 */
MutateData.prototype.number = function(num) {
  var mutator = num || this.data;
  return (mutator % 1 === 0) ? this.integer() : this.float(mutator);
};

/**
 * Return a random integer between two bounds
 * @return {Number} The random number
 */
MutateData.prototype.integer = function() {
  return _.random(this.config.number.integer.min, this.config.number.integer.max);
};

/**
 * Return a random float, to the precision of the seed number
 * @param  {Number} num A float to mutate from
 * @return {Number}     A new random float the same precision as the seed float
 */
MutateData.prototype.float = function(num) {
  return parseFloat(Math.min(this.config.number.float.min + (Math.random() * (this.config.number.float.max - this.config.number.float.min)), this.config.number.float.max).toFixed(this.config.number.float.arbitraryPrecision));
};

/**
 * VERY naivley mutates regex's, be warned, this coule be flaky
 * @param  {RegExp} reg A regexp to mutate
 * @return {RegExp}     A mutated regex
 */
MutateData.prototype.regexp = function(reg) {
  // This is a VERY naive mutation
  var mutator = reg || this.data;
  var composition = mutator.toString().split('/');
  var pattern = composition[1];
  var newPattern = this.string(pattern.replace('-', ''));
  var flags = composition[2];

  return new RegExp([newPattern, flags].join('/'));
};

/**
 * NOT IMPLEMENRED: mutate a function
 */
MutateData.prototype.function = function(fn) {
  return fn || this.data;
};

/**
 * NOT IMPLEMENRED: mutate null
 */
MutateData.prototype.null = function() {
  return null;
};

/**
 * NOT IMPLEMENRED: mutate undefined
 */
MutateData.prototype.undefined = function() {
  return undefined;
};

/**
 * Mutates a date object to be between two arbitrary dates
 * @param  {Date} dt The Date object that serves as the start of the random range
 * @return {Date}    The new mutated date
 */
MutateData.prototype.date = function(dt) {
  var start = dt || this.data;
  var end = new Date(this.config.date.endYear, 1, 1);

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

module.exports.mutate = mutate;
