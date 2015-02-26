## Fuzzur

A [fuzzer](http://en.wikipedia.org/wiki/Fuzz_testing) for testing. This implements mutation fuzzing, in which an expect input is mutated (changed) many times in order to trigger unexpected behavior or crashes.

This is based heavily on the existing [Fuzzer by Mapbox](https://github.com/mapbox/fuzzer) by Mapbox. There are a couple of key differences however:

* The mutation is done through one method, and internal type inference and detection. Built to satisfy my own use case.
* Ancdotally, and again for my specific use case, it is 2x faster.
* It implements `regex` mutator
* It's `Array` and `Object` recrusion patterns are more efficently traversed for very large trees. I have *some* data on this, and will update soon, it's not a massive improvement but for my use case made a difference.

## Install

```
npm install fuzzur
```

## Usage

Using the fuzzer is simple, in it's most basic forum it can be used thusly.

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

## Testing

```
npm test
```

## Notes

There are currently three types that not mutable via Fuzzur, they are:

* `Function` - this is coming soon
* `Undefined`
* `null`
