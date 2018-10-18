import 'raf/polyfill';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import configureStore from 'store/index';
import routes from 'routes/routes';
import reducers from 'reducers/reducers';

if (process.env.NODE_ENV === 'development') {
  const { registerObserver } = require('react-perf-devtool');
  registerObserver();
}

const initialState = {};

const renderDom = () => {
  const { history, store } = configureStore(initialState, reducers);

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
