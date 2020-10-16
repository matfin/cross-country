import { AppDispatch, AppState, AppThunk, MarkerUpdatedDetail, Route, Waypoint } from 'models';
import ActionTypes from './actionTypes';

interface AddWaypoint {
  type: ActionTypes.ADD_WAYPOINT;
  payload: Waypoint;
}

interface DeleteWaypoint {
  type: ActionTypes.DELETE_WAYPOINT;
  payload: Waypoint;
}

interface ResetPlanner {
  type: ActionTypes.RESET_PLANNER;
}

interface SetCurrentRoute {
  type: ActionTypes.SET_CURRENT_ROUTE;
  payload: Route | null;
}

interface UpdateWaypoint {
  type: ActionTypes.UPDATE_WAYPOINT;
  payload: MarkerUpdatedDetail;
}

export type PlannerActionTypes = AddWaypoint | DeleteWaypoint | ResetPlanner | SetCurrentRoute | UpdateWaypoint;

export const addWaypoint = (waypoint: Waypoint): PlannerActionTypes => ({
  type: ActionTypes.ADD_WAYPOINT,
  payload: waypoint,
});

export const deleteWaypoint = (waypoint: Waypoint): PlannerActionTypes => ({
  type: ActionTypes.DELETE_WAYPOINT,
  payload: waypoint,
});

export const resetPlanner = (): PlannerActionTypes => ({
  type: ActionTypes.RESET_PLANNER,
});

export const setCurrentRoute = (slug: string): AppThunk => async (dispatch: AppDispatch, getState: () => AppState) => {
  const { routesState }: AppState = getState();
  const { routes } = routesState;
  const foundRoute: Route | undefined = routes.find((route: Route): boolean => route.slug === slug);

  return dispatch({
    type: ActionTypes.SET_CURRENT_ROUTE,
    payload: foundRoute ?? null,
  });
};

export const updateWaypoint = (coordinate: google.maps.LatLngLiteral, uuid: string): PlannerActionTypes => ({
  type: ActionTypes.UPDATE_WAYPOINT,
  payload: { coordinate, uuid },
});
