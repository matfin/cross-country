import { combineReducers, createStore, Reducer, Store } from 'redux';
import mapState from 'components/map/reducer';
import routesState from 'views/routes/reducer';
import plannerState from 'views/planner/reducer';

const rootReducer: Reducer = combineReducers({
  mapState,
  plannerState,
  routesState,
});

const store = (): Store => createStore(rootReducer);

export default store;
