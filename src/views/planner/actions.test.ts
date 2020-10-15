import { Waypoint } from 'models';
import { addWaypoint, deleteWaypoint, updateWaypoint } from './actions';
import ActionTypes from './actionTypes';

describe('planner actions test', (): void => {
  const marker: google.maps.Marker = {} as google.maps.Marker;

  it('adds a waypoint', (): void => {
    expect(addWaypoint(marker)).toEqual({
      type: ActionTypes.ADD_WAYPOINT,
      payload: {},
    });
  });

  it('deletes a waypoint', (): void => {
    const waypoint: Waypoint = {
      id: '1234',
      dateUpdated: new Date(),
      marker,
    };

    expect(deleteWaypoint(waypoint)).toEqual({
      type: ActionTypes.DELETE_WAYPOINT,
      payload: waypoint,
    });
  });

  it('updates a waypoint', (): void => {
    const coordinate: google.maps.LatLngLiteral = {
      lat: 1.0,
      lng: 1.0,
    };
    const uuid = '123';

    expect(updateWaypoint(coordinate, uuid)).toEqual({
      type: ActionTypes.UPDATE_WAYPOINT,
      payload: { coordinate, uuid },
    });
  });
});
