import { ObjectArray } from 'js-corelib';

const DemoDocs: ObjectArray<any> = {};
const imports = require.context('.', false, /\.vue$/);
imports.keys().forEach((key) => {
  const id = key.replace(/(\.\/|\.vue)/g, '');
  DemoDocs[`${id}Doc`] = imports(key).default;
});

export { DemoDocs };
