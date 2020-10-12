import { PlannerState, Waypoint } from 'models';
import ActionTypes from './actionTypes';
import reducer, { initialState } from './reducer';

const waypoint: Waypoint = {
  id: '123',
  position: {
    lat: 12,
    lng: 12,
  },
};

describe('planner reducer tests', (): void => {
  it('sets the state when updating if the api is loaded', (): void => {
    const state: PlannerState = reducer(initialState, {
      type: ActionTypes.ADD_WAYPOINT,
      payload: {
        lat: 12,
        lng: 12,
      },
    });
    const check = {
      ...initialState,
      waypoints: [waypoint],
    };

    expect(state).toMatchObject({
      ...state,
      waypoints: [
        {
          ...waypoint,
          id: expect.any(String),
        },
      ],
    });
  });
});
