import ActionTypes from './actionTypes';

interface SetApiLoaded {
  type: typeof ActionTypes.SET_API_LOADED;
  payload: boolean;
}

export type MapActionTypes = SetApiLoaded;

export const setApiLoaded = (apiLoaded: boolean): MapActionTypes => ({
  type: ActionTypes.SET_API_LOADED,
  payload: apiLoaded,
});
