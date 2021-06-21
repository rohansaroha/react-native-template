import { combineReducers } from 'redux';
import configureStore from 'app/utils/createStore';
import rootSaga from 'app/rootSaga';
import homeContainerReducer from './scenes/HomeScreen/reducer';

export default () => {
  const rootReducer = combineReducers({
    homeContainerReducer
  });

  return configureStore(rootReducer, rootSaga);
};
