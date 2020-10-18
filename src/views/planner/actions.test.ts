import { Store } from 'redux';
import { createMockStore } from 'utils/testutils';
import { initialState as routesState } from 'views/routes/reducer';
import { Waypoint, Route } from 'models';
import {
  addWaypoint,
  deleteWaypoint,
  PlannerActionTypes,
  resetPlanner,
  setCurrentRoute,
  updateWaypoint,
} from './actions';
import ActionTypes from './actionTypes';

describe('planner actions test', (): void => {
  const waypoint: Waypoint = {
    dateUpdated: new Date('1982-04-26'),
    id: '1234',
    marker: {} as google.maps.Marker,
  };
  const route: Route = {
    dateCreated: new Date('1982-04-26'),
    id: '1234',
    slug: 'test-route',
    title: 'Test Route',
  };
  let store: Store;

  beforeEach((): void => {
    store = createMockStore({
      routesState: {
        ...routesState,
        routes: [route],
      },
    });
  });

  it('adds a waypoint', (): void => {
    expect(addWaypoint(waypoint)).toEqual({
      type: ActionTypes.ADD_WAYPOINT,
      payload: waypoint,
    });
  });

  it('deletes a waypoint', (): void => {
    expect(deleteWaypoint(waypoint)).toEqual({
      type: ActionTypes.DELETE_WAYPOINT,
      payload: waypoint,
    });
  });

  it('resets the planner', (): void => {
    expect(resetPlanner()).toEqual({
      type: ActionTypes.RESET_PLANNER,
    });
  });

  it('sets the current route from a slug assuming one is found', async (): Promise<void> => {
    // given
    const expectedActions: PlannerActionTypes[] = [
      {
        type: ActionTypes.SET_CURRENT_ROUTE,
        payload: route,
      },
    ];

    // then
    await store.dispatch<any>(setCurrentRoute('test-route'));
    await expect((store as any).getActions()).toEqual(expectedActions);
  });

  it('sets the current route from a slug as null when not found', async (): Promise<void> => {
    // given
    const expectedActions: PlannerActionTypes[] = [
      {
        type: ActionTypes.SET_CURRENT_ROUTE,
        payload: null,
      },
    ];

    // then
    await store.dispatch<any>(setCurrentRoute('missing-route'));
    await expect((store as any).getActions()).toEqual(expectedActions);
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
