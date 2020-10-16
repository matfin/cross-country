import { PlannerState, ReduxAction, Route, Waypoint } from 'models';
import ActionTypes from './actionTypes';

export const initialState: PlannerState = {
  route: null,
};

const reducer = (state: PlannerState = initialState, { payload, type }: ReduxAction): PlannerState => {
  switch (type) {
    case ActionTypes.ADD_WAYPOINT: {
      const waypoint: Waypoint = payload;
      const { route } = state;

      if (route) {
        const { waypoints } = route;

        return {
          ...state,
          route: {
            ...route,
            waypoints: [...(waypoints ?? []), waypoint],
          },
        };
      }

      return state;
    }

    case ActionTypes.DELETE_WAYPOINT: {
      const { route } = state;

      if (route) {
        const waypointToDelete: Waypoint = payload;
        const { waypoints } = route;
        const updatedWaypoints: Waypoint[] = (waypoints ?? []).filter(({ id }: Waypoint) => id !== waypointToDelete.id);

        return {
          ...state,
          route: {
            ...route,
            waypoints: updatedWaypoints,
          },
        };
      }

      return state;
    }

    case ActionTypes.RESET_PLANNER: {
      return initialState;
    }

    case ActionTypes.SET_CURRENT_ROUTE: {
      const route: Route | null = payload;

      return {
        ...state,
        route,
      };
    }

    case ActionTypes.UPDATE_WAYPOINT: {
      const { route } = state;

      if (route) {
        const { waypoints } = route;
        const { coordinate, uuid } = payload;
        const foundIndex: number = (waypoints ?? []).findIndex(({ id }: Waypoint) => id === uuid);

        if (waypoints && foundIndex !== -1) {
          const waypointToUpdate: Waypoint = waypoints[foundIndex];

          waypointToUpdate.marker.setPosition(coordinate);
          waypointToUpdate.dateUpdated = new Date();
          waypoints[foundIndex] = waypointToUpdate;
        }

        return {
          ...state,
          route: {
            ...route,
            waypoints: [...(waypoints ?? [])],
          },
        };
      }

      return state;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
