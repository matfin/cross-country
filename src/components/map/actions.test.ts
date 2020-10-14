import ActionTypes from './actionTypes';
import { setApiLoaded, setMap } from './actions';

describe('map action tests', (): void => {
  it('updates the api loaded state', (): void => {
    expect(setApiLoaded(true)).toEqual({
      type: ActionTypes.SET_API_LOADED,
      payload: true,
    });
  });

  it('updates the map instance', (): void => {
    expect(setMap({} as google.maps.Map<HTMLDivElement>)).toEqual({
      type: ActionTypes.SET_MAP,
      payload: {},
    });
  });
});
