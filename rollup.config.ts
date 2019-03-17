import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

import { uglify } from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const libraryName = 'fadin'

export default [
	{
		input: 'lib/index.ts',
		output: {
			name: libraryName,
			file: pkg.browser,
			format: 'umd'
    },
    watch: {
      include: 'lib/**'
    },
		plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
			resolve(),
      commonjs(),
      sourceMaps(),
      uglify()
		]
	},
	{
		input: 'lib/index.ts',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
    ],
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      sourceMaps(),
    ]
	}]
