import { MapPosition } from 'models';
import { addWaypoint } from './actions';
import ActionTypes from './actionTypes';

describe('planner actions test', (): void => {
  it('adds a waypoint', (): void => {
    const position: MapPosition = {
      lat: 10.0,
      lng: 10.0,
    };

    expect(addWaypoint(position)).toEqual({
      type: ActionTypes.ADD_WAYPOINT,
      payload: position,
    });
  });
});
