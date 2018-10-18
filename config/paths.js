const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.APP_URL;

function ensureSlash(urlPath, needsSlash) {
  const hasSlash = urlPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return urlPath.substr(urlPath, urlPath.length - 1);
  }

  if (!hasSlash && needsSlash) {
    return `${urlPath}/`;
  }
  return urlPath;
}

const getPublicUrl = appPackageJson => (
  process.env.APP_URL || envPublicUrl || require(appPackageJson).homepage
);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.jsx'),
  appGlobalScss: resolveApp('src/global-styles.scss'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: process.env.APP_URL,
  servedPath: getServedPath(resolveApp('package.json')),
  node_modules: resolveApp('node_modules'),
  libPath: resolveApp('public/static/lib')
};
