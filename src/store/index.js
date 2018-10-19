import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory';
import * as reducers from 'reducers';

const configureStore = (initialState = {}) => {
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
