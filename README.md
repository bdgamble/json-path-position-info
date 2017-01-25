# json-path-position-info

[![Greenkeeper badge](https://badges.greenkeeper.io/bdgamble/json-path-position-info.svg)](https://greenkeeper.io/)
Module to provide the position info of a JSONPath within a blob of JSON

## Usage

```es6
const jppi = require('json-path-position-info');

const json = {
  prop1: 'one',
  prop2: 2,
  prop3: {
    three: true
  },
  prop4: [
    {
      index: 1
    },
    {
      index: 2
    }
  ]
};

const data = jppi(json, 'prop3.three', '.', '  ');
console.log(data);

// Output: { source: '{\n  "prop1": "one",\n  "prop2": 2,\n  "prop3": {\n    "three": true\n  },\n  "prop4": [\n    {\n      "index": 1\n    },\n    {\n      "index": 2\n    }\n  ]\n}',
  line: 5,
  column: 5,
  pos: 46 }
```
