import { PlannerState, Route, Waypoint } from 'models';
import ActionTypes from './actionTypes';
import reducer, { initialState } from './reducer';

const route: Route = {
  dateCreated: new Date('1982-04-26'),
  id: '1234',
  slug: 'test-route',
  title: 'Test Route',
};

const waypoint: Waypoint = {
  dateUpdated: new Date(),
  id: '123',
  marker: {} as google.maps.Marker,
};

describe('planner reducer tests', (): void => {
  it('sets the state when adding a waypoint', (): void => {
    // given route is not null
    let state: PlannerState = reducer(
      {
        ...initialState,
        route,
      },
      {
        type: ActionTypes.ADD_WAYPOINT,
        payload: waypoint,
      },
    );

    // then
    expect(state).toMatchObject({
      ...initialState,
      route: {
        ...route,
        waypoints: [waypoint],
      },
    });

    // given route is null
    state = reducer(initialState, {
      type: ActionTypes.ADD_WAYPOINT,
      payload: waypoint,
    });

    // then
    expect(state).toEqual(initialState);
  });

  it('sets the state when deleting a waypoint', (): void => {
    // given route is not null
    let state: PlannerState = reducer(
      {
        ...initialState,
        route: {
          ...route,
          waypoints: [waypoint],
        },
      },
      {
        type: ActionTypes.DELETE_WAYPOINT,
        payload: waypoint,
      },
    );

    // then
    expect(state).toEqual({
      ...initialState,
      route: {
        ...route,
        waypoints: [],
      },
    });

    // given route is null
    state = reducer(initialState, {
      type: ActionTypes.DELETE_WAYPOINT,
      payload: waypoint,
    });

    // then
    expect(state).toEqual(initialState);

    // given there are no waypoints on the route
    state = reducer(
      {
        ...initialState,
        route: {
          ...route,
          waypoints: undefined,
        },
      },
      {
        type: ActionTypes.DELETE_WAYPOINT,
        payload: waypoint,
      },
    );

    // then
    expect(state).toEqual({
      ...initialState,
      route: {
        ...route,
        waypoints: [],
      },
    });
  });

  it('sets the state when updating a waypoint', (): void => {
    // given route is not null
    const sypSetPosition = jest.fn();
    const payload: { coordinate: google.maps.LatLngLiteral; uuid: string } = {
      coordinate: {
        lat: 10.0,
        lng: 10.0,
      },
      uuid: '123',
    };
    const waypoints: Waypoint[] = [
      {
        ...waypoint,
        marker: {
          setPosition: sypSetPosition,
        } as any,
      },
    ];
    let state: PlannerState = reducer(
      {
        ...initialState,
        route: {
          ...route,
          waypoints,
        },
      },
      {
        type: ActionTypes.UPDATE_WAYPOINT,
        payload,
      },
    );

    // then
    expect(state).toEqual({
      ...initialState,
      route: {
        ...route,
        waypoints,
      },
    });
    expect(sypSetPosition).toHaveBeenCalledTimes(1);

    // given route is null
    state = reducer(initialState, {
      type: ActionTypes.UPDATE_WAYPOINT,
      payload,
    });

    // then
    expect(state).toEqual(initialState);
    expect(sypSetPosition).toHaveBeenCalledTimes(1);

    // given there are no waypoints on the route
    state = reducer(
      {
        ...initialState,
        route: {
          ...route,
          waypoints: undefined,
        },
      },
      {
        type: ActionTypes.UPDATE_WAYPOINT,
        payload: waypoint,
      },
    );

    // then
    expect(state).toEqual({
      ...initialState,
      route: {
        ...route,
        waypoints: [],
      },
    });
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
        route: {
          ...route,
          waypoints,
        },
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

  it('sets the state when resetting the planner', (): void => {
    // given
    const state = reducer(
      {
        ...initialState,
        route: {
          ...route,
          waypoints: [{}, {}] as any,
        },
      },
      {
        type: ActionTypes.RESET_PLANNER,
      },
    );

    // then
    expect(state).toEqual(initialState);
  });

  it('sets the state when setting a current route', (): void => {
    // given
    const state = reducer(initialState, {
      type: ActionTypes.SET_CURRENT_ROUTE,
      payload: route,
    });

    // then
    expect(state).toEqual({
      ...initialState,
      route,
    });
  });

  it('returns the default state', (): void => {
    const state: PlannerState = reducer(undefined, {
      type: '',
    });

    expect(state).toEqual(initialState);
  });
});
