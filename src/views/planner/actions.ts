import { MarkerUpdatedDetail, Waypoint } from 'models';
import ActionTypes from './actionTypes';

interface AddWaypoint {
  type: ActionTypes.ADD_WAYPOINT;
  payload: google.maps.Marker;
}

interface DeleteWaypoint {
  type: ActionTypes.DELETE_WAYPOINT;
  payload: Waypoint;
}

interface UpdateWaypoint {
  type: ActionTypes.UPDATE_WAYPOINT;
  payload: MarkerUpdatedDetail;
}

export type PlannerActionTypes = AddWaypoint | DeleteWaypoint | UpdateWaypoint;

export const addWaypoint = (marker: google.maps.Marker): PlannerActionTypes => ({
  type: ActionTypes.ADD_WAYPOINT,
  payload: marker,
});

export const deleteWaypoint = (waypoint: Waypoint): PlannerActionTypes => ({
  type: ActionTypes.DELETE_WAYPOINT,
  payload: waypoint,
});

export const updateWaypoint = (coordinate: google.maps.LatLngLiteral, uuid: string): PlannerActionTypes => ({
  type: ActionTypes.UPDATE_WAYPOINT,
  payload: { coordinate, uuid },
});
