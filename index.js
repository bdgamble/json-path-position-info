'use strict';

const jsonMap = require('json-source-map');

module.exports = function(json, path, pathSeparator, whitespace) {
  whitespace = whitespace || '\t';
  if (typeof json === 'object') {
    try {
      json = JSON.stringify(json, null, whitespace);
    } catch (e) {
      throw new Error('Invalid JSON');
    }
  } else if (typeof json !== 'string') {
    throw new Error('Must provide json as either a valid json object or stringified json.');
  }
  pathSeparator = pathSeparator || '.';
  const sourceMapPath = '/' + path.split(pathSeparator).join('/');
  const result = jsonMap.parse(json);

  if (!result.pointers[sourceMapPath]) {
    throw new Error(`Path ${path} does not exist in the provided json.`);
  }

  const locationInfo = result.pointers[sourceMapPath].key
    || result.pointers[sourceMapPath].value; // if not key data, then part of an array and need value data
  const data = Object.assign(
    { source: JSON.stringify(result.data, null, whitespace) },
    locationInfo,
    {
      line: locationInfo.line + 1,
      column: locationInfo.column + 1
    } // bump line and column numbers by one to account for zero-based index
  );

  return data;
};
