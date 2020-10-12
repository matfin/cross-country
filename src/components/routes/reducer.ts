import { v4 as uuidv4 } from 'uuid';
import { Route, RoutesState, ReduxAction } from 'models';
import { slugify } from 'utils';
import ActionTypes from './actionTypes';

export const initialState: RoutesState = {
  error: null,
  newRouteTitle: '',
  pending: false,
  routes: [],
};

const reducer = (state: RoutesState = initialState, { payload, type }: ReduxAction): RoutesState => {
  switch (type) {
    case ActionTypes.ADD_ROUTE: {
      const { newRouteTitle } = state;
      const newRoute: Route = {
        dateCreated: new Date(),
        id: uuidv4(),
        slug: slugify(newRouteTitle),
        title: newRouteTitle,
      };
      const { routes } = state;

      return {
        ...state,
        newRouteTitle: '',
        routes: [...routes, newRoute],
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

    case ActionTypes.UPDATE_NEW_ROUTE_TITLE: {
      const newRouteTitle: string = payload;

      return {
        ...state,
        newRouteTitle,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
