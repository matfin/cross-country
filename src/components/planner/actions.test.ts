import { MapPosition, Waypoint } from 'models';
import { addWaypoint, deleteWaypoint } from './actions';
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

  it('deletes a waypoint', (): void => {
    const waypoint: Waypoint = {
      id: '1234',
      position: {
        lat: 10.0,
        lng: 1.0,
      },
    };

    expect(deleteWaypoint(waypoint)).toEqual({
      type: ActionTypes.DELETE_WAYPOINT,
      payload: waypoint,
    });
  });
});
