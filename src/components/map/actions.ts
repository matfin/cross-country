import ActionTypes from './actionTypes';

interface SetApiLoaded {
  type: typeof ActionTypes.SET_API_LOADED;
  payload: boolean;
}

interface SetMap {
  type: typeof ActionTypes.SET_MAP;
  payload: google.maps.Map<HTMLDivElement>;
}

export type MapActionTypes = SetApiLoaded | SetMap;

export const setApiLoaded = (apiLoaded: boolean): MapActionTypes => ({
  type: ActionTypes.SET_API_LOADED,
  payload: apiLoaded,
});

export const setMap = (map: google.maps.Map<HTMLDivElement>): MapActionTypes => ({
  type: ActionTypes.SET_MAP,
  payload: map,
});
