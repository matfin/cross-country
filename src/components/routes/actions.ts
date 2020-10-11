import { Route } from 'models';
import ActionTypes from './actionTypes';

interface AddRoute {
  type: typeof ActionTypes.ADD_ROUTE;
  payload: Route;
}

interface DeleteRoute {
  type: typeof ActionTypes.DELETE_ROUTE;
  payload: Route;
}

export type RoutesActionTypes = AddRoute | DeleteRoute;

export const addRoute = (route: Route): RoutesActionTypes => ({
  type: ActionTypes.ADD_ROUTE,
  payload: route,
});

export const deleteRoute = (route: Route): RoutesActionTypes => ({
  type: ActionTypes.DELETE_ROUTE,
  payload: route,
});
