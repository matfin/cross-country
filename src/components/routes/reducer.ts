import { Route, RoutesState, ReduxAction } from 'models';
import ActionTypes from './actionTypes';

export const initialState: RoutesState = {
  error: null,
  pending: false,
  routes: [],
};

const reducer = (state: RoutesState = initialState, { payload, type }: ReduxAction): RoutesState => {
  switch (type) {
    case ActionTypes.ADD_ROUTE: {
      const route = payload;
      const { routes } = state;

      return {
        ...state,
        routes: [...routes, route],
      };
    }

    case ActionTypes.DELETE_ROUTE: {
      const route = payload;
      const { routes } = state;
      const filteredRoutes: Route[] = routes.filter(({ id }: Route) => id !== route.id);

      return {
        ...state,
        routes: filteredRoutes,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
