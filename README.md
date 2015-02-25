## Fuzzur

A [fuzzer](http://en.wikipedia.org/wiki/Fuzz_testing) for testing. This implements mutation fuzzing, in which an expect input is mutated (changed) many times in order to trigger unexpected behavior or crashes.

This is based heavily on the existing [Fuzzer by Mapbox](https://github.com/mapbox/fuzzer).

## Install

```
npm install fuzzur
```

## Usage

Using the fuzzer is simple, in it's most basic forum it can be used thusly.

```javascript
var fuzzur = require('fuzzur'),
    mutatedData = fuzzur.mutate(/* Some data type */);
```

Fuzzur supports many data types out of the box: `Object`, `Array`, `String`, `Number`, `Regex`. It also supports `n` recursion levels for `Object` and `Array`.

Please see the `./test/` directory for many more examples.

## Testing

```
npm test
```