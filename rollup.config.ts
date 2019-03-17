import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

const pkg = require('./package.json')

const libraryName = 'fader'

export default {
  input: `lib/index.ts`,
  output: { exports: 'named', file: `${pkg.main}.js`, name: libraryName, format: 'iife', sourcemap: true },
  external: [],
  watch: {
    include: 'lib/**',
  },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
    sourceMaps(),
  ],
}