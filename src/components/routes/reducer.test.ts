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
    const state = reducer(undefined, {
      type: ActionTypes.ADD_ROUTE,
      payload: route,
    });
    const check = {
      ...initialState,
      routes: [route],
    };

    expect(state).toEqual(check);
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
});
