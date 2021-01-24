import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import { mdsvex } from "mdsvex";

const production = !process.env.ROLLUP_WATCH;

const docsConfig = {
  input: 'src/docs/main.js',
  outputFormat: 'iife',
  outputFile: 'docs/index.js'
}
const packageConfig = {
  input: 'src/main.js',
  outputFormat: 'es',
  outputFile: 'dist/index.js'
}

const docs = !!process.env.DOCS
const getConfig = () => {
  return docs ? docsConfig : packageConfig
}

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

export default {
  input: getConfig().input,
  output: {
    sourcemap: false,
    format: getConfig().outputFormat,
    name: 'app',
    file: getConfig().outputFile
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production
      },
      // tell svelte to handle mdsvex files
      extensions: [".svelte", ".svx"],
      preprocess: mdsvex()
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'index.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
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
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
