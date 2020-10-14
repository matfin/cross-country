import { MapPosition, Waypoint } from 'models';
import ActionTypes from './actionTypes';

interface AddWaypoint {
  type: ActionTypes.ADD_WAYPOINT;
  payload: MapPosition;
}

interface DeleteWaypoint {
  type: ActionTypes.DELETE_WAYPOINT;
  payload: Waypoint;
}

export type PlannerActionTypes = AddWaypoint | DeleteWaypoint;

export const addWaypoint = (position: MapPosition): PlannerActionTypes => ({
  type: ActionTypes.ADD_WAYPOINT,
  payload: position,
});

export const deleteWaypoint = (waypoint: Waypoint): PlannerActionTypes => ({
  type: ActionTypes.DELETE_WAYPOINT,
  payload: waypoint,
});
