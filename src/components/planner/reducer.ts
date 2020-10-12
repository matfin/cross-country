import { v4 as uuidv4 } from 'uuid';
import { MapPosition, PlannerState, ReduxAction, Waypoint } from 'models';
import ActionTypes from './actionTypes';

export const initialState: PlannerState = {
  waypoints: [],
};

const reducer = (state: PlannerState = initialState, { payload, type }: ReduxAction): PlannerState => {
  switch (type) {
    case ActionTypes.ADD_WAYPOINT: {
      const position: MapPosition = payload;
      const waypoint: Waypoint = {
        id: uuidv4(),
        position,
      };
      const { waypoints } = state;

      return {
        ...state,
        waypoints: [...waypoints, waypoint],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
