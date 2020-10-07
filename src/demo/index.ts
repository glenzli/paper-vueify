import { ObjectArray } from 'js-corelib';

const Demos: ObjectArray<any> = {};
const imports = require.context('.', false, /\.vue$/);
imports.keys().forEach((key) => {
  const id = key.replace(/(\.\/|\.vue)/g, '');
  Demos[`${id}Demo`] = imports(key).default;
});

export { Demos };
