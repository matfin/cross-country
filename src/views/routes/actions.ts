import { Route } from 'models';
import ActionTypes from './actionTypes';

interface AddRoute {
  type: typeof ActionTypes.ADD_ROUTE;
}

interface DeleteRoute {
  type: typeof ActionTypes.DELETE_ROUTE;
  payload: Route;
}

interface SetCurrentRoute {
  type: ActionTypes.SET_CURRENT_ROUTE;
  payload: string;
}

interface ResetCurrentRoute {
  type: ActionTypes.RESET_CURRENT_ROUTE;
}

interface UpdateNewRouteTitle {
  type: typeof ActionTypes.UPDATE_NEW_ROUTE_TITLE;
  payload: string;
}

export type RoutesActionTypes = AddRoute | DeleteRoute | ResetCurrentRoute | SetCurrentRoute | UpdateNewRouteTitle;

export const addRoute = (): RoutesActionTypes => ({
  type: ActionTypes.ADD_ROUTE,
});

export const deleteRoute = (route: Route): RoutesActionTypes => ({
  type: ActionTypes.DELETE_ROUTE,
  payload: route,
});

export const resetCurrentRoute = (): RoutesActionTypes => ({
  type: ActionTypes.RESET_CURRENT_ROUTE,
});

export const setCurrentRoute = (slug: string): RoutesActionTypes => ({
  type: ActionTypes.SET_CURRENT_ROUTE,
  payload: slug,
});

export const updateNewRouteTitle = (title: string): RoutesActionTypes => ({
  type: ActionTypes.UPDATE_NEW_ROUTE_TITLE,
  payload: title,
});
