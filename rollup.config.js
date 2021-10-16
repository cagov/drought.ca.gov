import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/js/index-headless.js',
  output: {
    file: 'dist/built.js',
    format: 'esm'
  },
  plugins: [resolve(), json(), terser()]
};