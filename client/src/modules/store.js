import { createLogger } from 'redux-logger';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

// const logger = createLogger();
// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   ReduxThunk,
// )(createStore);
// const store = createStoreWithMiddleware(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(logger)),
// );

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware,
  logger,
  promiseMiddleware,
  ReduxThunk,
)(createStore);

const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(createStoreWithMiddleware())
    : composeWithDevTools(applyMiddleware());

const store = createStoreWithMiddleware(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

export default store;
