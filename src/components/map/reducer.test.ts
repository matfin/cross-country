import { MapState } from 'models';
import ActionTypes from './actionTypes';
import reducer, { initialState } from './reducer';

describe('map reducer tests', (): void => {
  it('sets the state when updating if the api is loaded', (): void => {
    const state: MapState = reducer(initialState, {
      type: ActionTypes.SET_API_LOADED,
      payload: true,
    });
    const check = {
      ...initialState,
      apiLoaded: true,
    };

    expect(state).toEqual(check);
  });

  it('sets the state when updating the map instance', (): void => {
    const state: MapState = reducer(initialState, {
      type: ActionTypes.SET_MAP,
      payload: {} as google.maps.Map,
    });
    const check = {
      ...initialState,
      map: {} as google.maps.Map,
    };

    expect(state).toEqual(check);
  });
});
