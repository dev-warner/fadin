import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

import { uglify } from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const libraryName = 'fadin'

const config = (type, format) => ({
  input: `lib/index.ts`,
  output: {
    file: pkg[type],
    name: libraryName,
    exports: 'named',
    format,
    sourcemap: true
  },
  external: [],
  watch: {
    include: 'lib/**'
  },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
    sourceMaps(),
    uglify()
  ]
})

export default [config('main', 'iife'), config('module', 'cjs')]
