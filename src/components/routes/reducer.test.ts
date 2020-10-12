import { Route, RoutesState } from 'models';
import ActionTypes from './actionTypes';
import reducer, { initialState } from './reducer';

describe('routes reducer test', (): void => {
  const route: Route = {
    dateCreated: new Date('1982-04-26'),
    id: '1234',
    note: 'Test note',
    slug: 'test-route',
    title: 'Test Route',
  };

  it('sets the state when adding a route', (): void => {
    const state: RoutesState = reducer(
      {
        ...initialState,
        newRouteTitle: 'Test Route',
      },
      {
        type: ActionTypes.ADD_ROUTE,
      },
    );
    const check = {
      ...initialState,
      routes: [route],
    };

    expect(check).toMatchObject({
      ...state,
      routes: [
        {
          ...route,
          dateCreated: expect.any(Date),
          id: expect.any(String),
        },
      ],
    });
  });

  it('sets the state when deleting a route', (): void => {
    const routeToDelete = {
      ...route,
      id: '5678',
    };
    const state: RoutesState = reducer(
      {
        ...initialState,
        routes: [route, routeToDelete],
      },
      {
        type: ActionTypes.DELETE_ROUTE,
        payload: routeToDelete,
      },
    );

    expect(state.routes).toEqual([route]);
  });

  it('sets the state when updating a route title', (): void => {
    const state: RoutesState = reducer(initialState, {
      payload: 'A new route',
      type: ActionTypes.UPDATE_NEW_ROUTE_TITLE,
    });
    const check = {
      ...initialState,
      newRouteTitle: 'A new route',
    };

    expect(state).toEqual(check);
  });

  it('sets the current route from a slug', (): void => {
    const state: RoutesState = reducer(
      {
        ...initialState,
        routes: [route],
      },
      {
        type: ActionTypes.SET_CURRENT_ROUTE,
        payload: 'test-route',
      },
    );
    const check: RoutesState = {
      ...initialState,
      routes: [route],
      currentRoute: route,
    };

    expect(state).toEqual(check);
  });

  it('sets the current route to null for an unknown slug', (): void => {
    const state: RoutesState = reducer(
      {
        ...initialState,
        routes: [route],
      },
      {
        type: ActionTypes.SET_CURRENT_ROUTE,
        payload: 'unknown-route',
      },
    );
    const check: RoutesState = {
      ...initialState,
      routes: [route],
      currentRoute: null,
    };

    expect(state).toEqual(check);
  });

  it('resets the current route', (): void => {
    const state: RoutesState = reducer(
      {
        ...initialState,
        currentRoute: route,
      },
      {
        type: ActionTypes.RESET_CURRENT_ROUTE,
      },
    );

    expect(state).toEqual(initialState);
  });
});
