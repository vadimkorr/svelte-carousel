import { join } from 'path'
import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import css from 'rollup-plugin-import-css'
import image from '@rollup/plugin-image';
import { mdsvex } from 'mdsvex'

const production = !process.env.ROLLUP_WATCH

const docsConfig = {
  input: 'src/docs/main.js',
  outputFormat: 'iife',
  outputFile: 'docs/index.js',
}

const getConfig = () => docsConfig

function serve() {
  let server

  function toExit() {
    if (server) server.kill(0)
  }

  return {
    writeBundle() {
      if (server) return
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      )

      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    },
  }
}

export default {
  input: getConfig().input,
  output: {
    sourcemap: false,
    format: getConfig().outputFormat,
    name: 'app',
    file: getConfig().outputFile,
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
      // tell svelte to handle mdsvex files
      extensions: ['.svelte', '.svx'],
      preprocess: mdsvex({
        layout: {
          _: join(__dirname, './src/docs/Layouts/Main.svelte'),
        },
      }),
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'index.css', minify: true }),

    image(),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('docs'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    json(),

    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
  ],
  watch: {
    clearScreen: false,
  },
}
