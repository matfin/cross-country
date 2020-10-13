import { Route } from 'models';
import ActionTypes from './actionTypes';
import { addRoute, deleteRoute, setCurrentRoute, resetCurrentRoute, updateNewRouteTitle } from './actions';

describe('routes action tests', (): void => {
  const route: Route = {
    dateCreated: new Date('1982-04-26'),
    id: '1234',
    note: 'Test note',
    slug: 'test-route',
    title: 'Test Route',
  };

  it('adds a route', (): void => {
    expect(addRoute()).toEqual({
      type: ActionTypes.ADD_ROUTE,
    });
  });

  it('deletes a route', (): void => {
    expect(deleteRoute(route)).toEqual({
      payload: route,
      type: ActionTypes.DELETE_ROUTE,
    });
  });

  it('updates the title for a new route', (): void => {
    expect(updateNewRouteTitle('Test title')).toEqual({
      payload: 'Test title',
      type: ActionTypes.UPDATE_NEW_ROUTE_TITLE,
    });
  });

  it('sets the current route', (): void => {
    expect(setCurrentRoute('test')).toEqual({
      payload: 'test',
      type: ActionTypes.SET_CURRENT_ROUTE,
    });
  });

  it('resets the current route', (): void => {
    expect(resetCurrentRoute()).toEqual({
      type: ActionTypes.RESET_CURRENT_ROUTE,
    });
  });
});
