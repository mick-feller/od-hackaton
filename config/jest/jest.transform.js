const { join, resolve } = require('path');
const { createTransformer } = require('babel-jest');

const packagePath = resolve('../../');
const packageGlob = join(packagePath, '*');

module.exports = createTransformer({
  babelrcRoots: packageGlob,
  presets: ['@babel/preset-env', '@babel/react'],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    [
      'module-resolver',
      {
        root: [
          './src'
        ]
      }
    ]
  ]
});
