## Fuzzur

![Travis](https://api.travis-ci.org/Joe8Bit/fuzzur.svg) [![Coverage Status](https://coveralls.io/repos/Joe8Bit/fuzzur/badge.svg?branch=master)](https://coveralls.io/r/Joe8Bit/fuzzur?branch=master) [![Code Climate](https://codeclimate.com/github/Joe8Bit/fuzzur/badges/gpa.svg)](https://codeclimate.com/github/Joe8Bit/fuzzur) [![npm version](https://badge.fury.io/js/fuzzur.svg)](http://badge.fury.io/js/fuzzur) [![Dependency Status](https://david-dm.org/joe8bit/fuzzur.svg)](https://david-dm.org/joe8bit/fuzzur)

A [fuzzer](http://en.wikipedia.org/wiki/Fuzz_testing) for testing. This implements mutation fuzzing, in which an expect input is mutated (changed) many times in order to trigger unexpected behavior or crashes.

This is based heavily on the existing [Fuzzer by Mapbox](https://github.com/mapbox/fuzzer) by Mapbox. There are a couple of key differences however:

* The mutation is done through one method, and internal type inference and detection. Built to satisfy my own use case.
* Ancdotally, and again for my specific use case, it is 2x faster.
* It implements additional `regex` and `Date` mutators
* It's `Array` and `Object` recursion patterns are more efficently traversed for some very large trees. I have *a little* data on this, and will update soon, it's not a massive improvement but for my use case made a difference.
* It supports some configurable options for the `String`, `Number` and `Date` mutators.
* It doesn't coerce number sub-types e.g. mutating an integer will result in an integer and mutating a float will result in a float.

## Install

```
npm install fuzzur
```

## Usage

Using the fuzzer is simple, in it's most basic form it can be used thusly.

```javascript
var test = require('tap').test,
    fuzzur = require('fuzzur');

test('My thing does something', function(t) {
  for (var i = 0; i < 1000; i++) {
    t.doesNotThrow(function() {
      myThing(fuzzur.mutate( /* some input type */ ));
    });
  }
});
```

Fuzzur supports many data types out of the box: `Object`, `Array`, `String`, `Number`, `Regex`. It also supports `n` recursion levels for `Object` and `Array`.

Please see the `./test/` directory for many more examples.

##Configuation
There are a few configurable options that can be set, they are passed in as the second argument to the `mutate()` invokation e.g.

```javascript
var test = require('tap').test,
    fuzzur = require('fuzzur');

test('My thing does something', function(t) {
  for (var i = 0; i < 1000; i++) {
    t.doesNotThrow(function() {
      myThing(fuzzur.mutate('foobar', {
        string: {
            sampleSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', // The set of chars from which the mutated strings are built, can be overriden with custom sets
            randomisationPasses: 10 // The maximum number of randomisation passes that are done on each string, a random number between 1 and this
        },
        number: {
          integer: {
              min: -1000, // The floor or numbers to generate from
              max: 10000 // The ceiling of features to generate too
            },
            float: {
              min: -1000, // The floor or numbers to generate from
              max: 10000 // The ceiling of features to generate too
              arbitraryPrecision: 2 // How many points of precision should be passed into .toFixed()
            }
        },
        date: {
            endYear: 2022 // The year before which our mutated date should be generated
        }
      }));
    });
  }
});
```


## Testing

```
npm test
```

## Notes

There are currently three types that not mutable via Fuzzur, they are:

* `Function` - this is coming soon
* `Undefined`
* `null`
