import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { AppState, ReduxAction } from 'models';
import mapState from 'components/map/reducer';
import routesState from 'views/routes/reducer';
import plannerState from 'views/planner/reducer';

const rootReducer: Reducer<AppState, ReduxAction> = combineReducers({
  mapState,
  plannerState,
  routesState,
});

const store = (): Store => createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
