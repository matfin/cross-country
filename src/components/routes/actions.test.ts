import { Route } from 'models';
import ActionTypes from './actionTypes';
import { addRoute, deleteRoute } from './actions';

describe('routes action tests', (): void => {
  const route: Route = {
    dateCreated: new Date('1982-04-26'),
    id: '1234',
    note: 'Test note',
    slug: 'test-route',
    title: 'Test Route',
  };

  it('adds a route', (): void => {
    expect(addRoute(route)).toEqual({
      payload: route,
      type: ActionTypes.ADD_ROUTE,
    });
  });

  it('deletes a route', (): void => {
    expect(deleteRoute(route)).toEqual({
      payload: route,
      type: ActionTypes.DELETE_ROUTE,
    });
  });
});
