import { Route } from 'models';
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
    const state = reducer(
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
    const state = reducer(
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
    const state = reducer(initialState, {
      payload: 'A new route',
      type: ActionTypes.UPDATE_NEW_ROUTE_TITLE,
    });
    const check = {
      ...initialState,
      newRouteTitle: 'A new route',
    };

    expect(state).toEqual(check);
  });
});
