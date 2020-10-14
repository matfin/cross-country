import { Waypoint } from 'models';
import ActionTypes from './actionTypes';

interface AddWaypoint {
  type: ActionTypes.ADD_WAYPOINT;
  payload: google.maps.Marker;
}

interface DeleteWaypoint {
  type: ActionTypes.DELETE_WAYPOINT;
  payload: Waypoint;
}

export type PlannerActionTypes = AddWaypoint | DeleteWaypoint;

export const addWaypoint = (marker: google.maps.Marker): PlannerActionTypes => ({
  type: ActionTypes.ADD_WAYPOINT,
  payload: marker,
});

export const deleteWaypoint = (waypoint: Waypoint): PlannerActionTypes => ({
  type: ActionTypes.DELETE_WAYPOINT,
  payload: waypoint,
});
