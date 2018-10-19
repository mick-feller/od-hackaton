import 'raf/polyfill';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import configureStore from 'store/index';
import routes from 'routes/routes';
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga';
ReactGA.initialize(process.env.GA);
ReactGA.pageview(window.location.pathname + window.location.search);

const tagManagerArgs = {
  gtmId: process.env.GTM
}

TagManager.initialize(tagManagerArgs)

if (process.env.NODE_ENV === 'development') {
  const { registerObserver } = require('react-perf-devtool');
  registerObserver();
}

const renderDom = () => {
  const { history, store } = configureStore();
  render(
    (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          { renderRoutes(routes) }
        </ConnectedRouter>
      </Provider>
    ),
    document.getElementById('App')
  );
};

renderDom();
