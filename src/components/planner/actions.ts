import { MapPosition } from 'models';
import ActionTypes from './actionTypes';

interface AddWaypoint {
  type: ActionTypes.ADD_WAYPOINT;
  payload: MapPosition;
}

export type PlannerActionTypes = AddWaypoint;

export const addWaypoint = (position: MapPosition): PlannerActionTypes => ({
  type: ActionTypes.ADD_WAYPOINT,
  payload: position,
});
