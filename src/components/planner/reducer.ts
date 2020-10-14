import { v4 as uuidv4 } from 'uuid';
import { PlannerState, ReduxAction, Waypoint } from 'models';
import { addMarkerDragEndListener } from 'services/googlemaps';
import ActionTypes from './actionTypes';

export const initialState: PlannerState = {
  waypoints: [],
};

const reducer = (state: PlannerState = initialState, { payload, type }: ReduxAction): PlannerState => {
  switch (type) {
    case ActionTypes.ADD_WAYPOINT: {
      const marker: google.maps.Marker = payload;
      const id = uuidv4();
      const waypoint: Waypoint = {
        dateUpdated: new Date(),
        id,
        marker,
      };
      const { waypoints } = state;

      // TODO: Put this somewhere better
      addMarkerDragEndListener(marker, id);

      return {
        ...state,
        waypoints: [...waypoints, waypoint],
      };
    }

    case ActionTypes.DELETE_WAYPOINT: {
      const { waypoints } = state;
      const waypoint: Waypoint = payload;
      const updatedWaypoints: Waypoint[] = waypoints.filter(({ id }: Waypoint) => id !== waypoint.id);

      return {
        ...state,
        waypoints: updatedWaypoints,
      };
    }

    case ActionTypes.UPDATE_WAYPOINT: {
      const { waypoints } = state;
      const { coordinate, uuid } = payload;
      const foundIndex: number = waypoints.findIndex(({ id }: Waypoint) => id === uuid);

      if (foundIndex !== -1) {
        const waypointToUpdate: Waypoint = waypoints[foundIndex];

        waypointToUpdate.marker.setPosition(coordinate);
        waypointToUpdate.dateUpdated = new Date();
        waypoints[foundIndex] = waypointToUpdate;
      }

      return {
        ...state,
        waypoints: [...waypoints],
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
