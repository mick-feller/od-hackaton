import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory';

const configureStore = (initialState = {}, fromServer, reducers) => {
  const history = createBrowserHistory();
  const initializedRouterMW = routerMiddleware(history);
  const middleware = composeWithDevTools(
    applyMiddleware(
      initializedRouterMW,
      thunk
    )
  );

  const store = createStore(combineReducers({
    ...reducers,
    router: routerReducer
  }), initialState, middleware);

  return { history, store };
};

export default configureStore;
