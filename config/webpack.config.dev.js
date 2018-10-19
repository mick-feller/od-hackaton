const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const eslintFormatter = require('eslint-formatter-pretty');
const Dotenv = require('dotenv-webpack');
const SizePlugin = require('size-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const ssr = process.env.SSR;

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

const shouldUseRelativeAssetPaths = publicPath === './';
const cssFilename = 'static/css/[name].css';
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};


// Created an array of plugins so we can do some conditional logic
const pluginList = [
  new webpack.NamedModulesPlugin(),
  // Makes some environment variables available to the JS code, for example:
  // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
  new Dotenv({
    path: './config/env/dev.env', // load this now instead of the ones in '.env'
    // load '.env.example' to verify the '.env' variables are all set.
    // Can also be a string to a different file.
    safe: false,
    // load all the predefined 'process.env' variables which
    // will trump anything local per dotenv specs.
    systemvars: true,
    silent: false // hide any errors
  }),
  new ExtractTextPlugin({
    filename: cssFilename
  }),
  new webpack.DefinePlugin(env.stringified),
  // This is necessary to emit hot updates (currently CSS only):
  new webpack.HotModuleReplacementPlugin(),
  // Watcher doesn't work well if you mistype casing in a path so we use
  // a plugin that prints an error when you attempt to do this.
  // See https://github.com/facebookincubator/create-react-app/issues/240
  new CaseSensitivePathsPlugin(),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: '../build/test-reports/bundle-report.html',
    defaultSizes: 'parsed',
    openAnalyzer: false,
    excludeAssets: /(.*)hot-update.js$/,
    logLevel: 'info'// Log level. Can be 'info', 'warn', 'error' or 'silent'.
  }),
  new CopyWebpackPlugin([
    { from: `${paths.libPath}/*.js`, to: 'static/lib', flatten: true }
  ]),
  new SizePlugin()
];

if (!ssr) {
  // Generates an `index.html` file with the <script> injected.
  pluginList.push(new HtmlWebpackPlugin({
    inject: true,
    template: paths.appHtml,
    chunksSortMode: (a, b) => {
      const order = ['global', 'main'];
      return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
    }
  }));

  pluginList.push(new InterpolateHtmlPlugin(env.raw));
}

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  mode: 'development',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM'
  },
  entry: {
    global: [
      paths.appGlobalScss
    ],
    main: ssr ? [
      'webpack-hot-middleware/client?reload=true&path=https://localhost:3000/__webpack_hmr',
      require.resolve('./polyfills'),
      paths.appIndexJs
    ] : [
      require.resolve('./polyfills'),
      // Finally, this is your app's code:
      paths.appIndexJs,
      // We include the app code last so that if there is a runtime error during
      // initialization, it doesn't blow up the WebpackDevServer client, and
      // changing JS code would still trigger a refresh.
      require.resolve('react-dev-utils/webpackHotDevClient')
    ]
    // We ship a few polyfills by default:
  },
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/[name].js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    // It is guaranteed to exist because we tweak it in `env.js`
    modules: ['node_modules', paths.appNodeModules].concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.scss'],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web'
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      // TODO: Disable require.ensure as it's not a standard language feature.
      // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
      // { parser: { requireEnsure: false } },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true
            }
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(Object.assign(
              {
                fallback: {
                  loader: require.resolve('style-loader'),
                  options: {
                    hmr: true
                  }
                },
                use: [
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      minimize: false,
                      sourceMap: true
                    }
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: {
                      // Necessary for external CSS imports to work
                      // https://github.com/facebookincubator/create-react-app/issues/2677
                      ident: 'postcss',
                      plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9' // React doesn't support IE8 anyway
                          ],
                          flexbox: 'no-2009'
                        })
                      ]
                    }
                  }
                ]
              },
              extractTextPluginOptions
            ))
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },
          {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(Object.assign(
              {
                fallback: {
                  loader: require.resolve('style-loader'),
                  options: {
                    hmr: false
                  }
                },
                use: [require.resolve('css-loader'), require.resolve('sass-loader')]
              },
              extractTextPluginOptions
            ))
          },
          {
            test: /\.svg$/,
            loader: 'raw-loader'
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.js$/, /\.html$/, /\.json$/, /\.sass$/, /\.scss$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ]
  },
  optimization: {
    concatenateModules: true,
    namedModules: true,
    providedExports: true,
    usedExports: true
  },
  plugins: pluginList,
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false
  }
};
