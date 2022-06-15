import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

import react from 'react';
import reactDom from 'react-dom';

const dev = process.env.BUILD !== 'production'

export default {
    input: './src/main.tsx',
    output: {
        file: pkg.main,
        format: 'umd',
        name: 'DiffViewer'
    },
    plugins: [
        nodeResolve({browser: true}),
        replace({
            preventAssignment: true,
          'process.env.NODE_ENV': JSON.stringify( 'development' )
        }),
        babel({
            extensions: [".js",".ts", ".tsx"],
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-react"
          ]
        }),
        commonjs({
            extensions: [".js",".ts", ".tsx"],
            include: 'node_modules/**',
            namedExports: {
                react: Object.keys(react),
                'react-dom': Object.keys(reactDom)
            }
        }),
        dev && serve(),
        dev && livereload()
    ]
}
