import { PlannerState, Waypoint } from 'models';
import ActionTypes from './actionTypes';
import * as googleServices from 'services/googlemaps';
import reducer, { initialState } from './reducer';

const waypoint: Waypoint = {
  dateUpdated: new Date(),
  id: '123',
  marker: {} as google.maps.Marker,
};

describe('planner reducer tests', (): void => {
  it('sets the state when adding a waypoint', (): void => {
    const spyAddMarkerDragEndListener = jest.spyOn(googleServices, 'addMarkerDragEndListener').mockImplementation();
    const state: PlannerState = reducer(initialState, {
      type: ActionTypes.ADD_WAYPOINT,
      payload: {} as google.maps.Marker,
    });

    expect(state).toMatchObject({
      ...state,
      waypoints: [
        {
          ...waypoint,
          dateUpdated: expect.any(Date),
          id: expect.any(String),
          marker: expect.any(Object),
        },
      ],
    });
    expect(spyAddMarkerDragEndListener).toHaveBeenCalled();

    // cleanup
    spyAddMarkerDragEndListener.mockRestore();
  });

  it('sets the state when deleting a waypoint', (): void => {
    const state: PlannerState = reducer(
      {
        ...initialState,
        waypoints: [waypoint],
      },
      {
        type: ActionTypes.DELETE_WAYPOINT,
        payload: waypoint,
      },
    );

    expect(state).toEqual(initialState);
  });

  it('sets the state when updating a waypoint', (): void => {
    const sypSetPosition = jest.fn();
    const waypoints: Waypoint[] = [
      {
        ...waypoint,
        marker: {
          setPosition: sypSetPosition,
        } as any,
      },
    ];
    const state: PlannerState = reducer(
      {
        ...initialState,
        waypoints,
      },
      {
        type: ActionTypes.UPDATE_WAYPOINT,
        payload: {
          coordinate: {
            lat: 10.0,
            lng: 10.0,
          },
          uuid: '123',
        },
      },
    );

    expect(state).toEqual({
      ...initialState,
      waypoints,
    });
    expect(sypSetPosition).toHaveBeenCalled();
  });

  it('does not set the state when updating a waypoint that was not found', (): void => {
    const sypSetPosition = jest.fn();
    const waypoints: Waypoint[] = [
      {
        ...waypoint,
        id: '567',
        marker: {
          setPosition: sypSetPosition,
        } as any,
      },
    ];

    reducer(
      {
        ...initialState,
        waypoints,
      },
      {
        type: ActionTypes.UPDATE_WAYPOINT,
        payload: {
          coordinate: {
            lat: 10.0,
            lng: 10.0,
          },
          uuid: '123',
        },
      },
    );

    expect(sypSetPosition).not.toHaveBeenCalled();
  });
});
