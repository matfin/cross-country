import { Route } from 'models';
import ActionTypes from './actionTypes';

interface AddRoute {
  type: typeof ActionTypes.ADD_ROUTE;
}

interface DeleteRoute {
  type: typeof ActionTypes.DELETE_ROUTE;
  payload: Route;
}

interface SaveRoute {
  type: typeof ActionTypes.SAVE_ROUTE;
  payload: Route;
}

interface UpdateNewRouteTitle {
  type: typeof ActionTypes.UPDATE_NEW_ROUTE_TITLE;
  payload: string;
}

export type RoutesActionTypes = AddRoute | DeleteRoute | SaveRoute | UpdateNewRouteTitle;

export const addRoute = (): RoutesActionTypes => ({
  type: ActionTypes.ADD_ROUTE,
});

export const deleteRoute = (route: Route): RoutesActionTypes => ({
  type: ActionTypes.DELETE_ROUTE,
  payload: route,
});

export const saveRoute = (route: Route): RoutesActionTypes => ({
  type: ActionTypes.SAVE_ROUTE,
  payload: route,
});

export const updateNewRouteTitle = (title: string): RoutesActionTypes => ({
  type: ActionTypes.UPDATE_NEW_ROUTE_TITLE,
  payload: title,
});
