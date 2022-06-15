import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';
console.log(process.env.BUILD)
const dev = process.env.BUILD !== 'production'

export default {
    input: './src/main.js',
    output: {
        file: pkg.main,
        format: 'umd',
        name: 'DiffViewer'
    },
    plugins: [
        nodeResolve(),
        replace({
          'process.env.NODE_ENV': JSON.stringify( 'development' )
        }),
        babel({
          presets: ["@babel/preset-react"]
        }),
        commonjs(),
        dev && serve(),
        dev && livereload()
    ]
}
