import { combineReducers, createStore, Reducer, Store } from 'redux';
import routesState from 'components/routes/reducer';

const rootReducer: Reducer = combineReducers({
  routesState,
});

const store = (): Store => createStore(rootReducer);

export default store;
