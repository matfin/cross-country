import ActionTypes from './actionTypes';
import { setApiLoaded } from './actions';

describe('map action tests', (): void => {
  it('updates the api loaded state', (): void => {
    expect(setApiLoaded(true)).toEqual({
      type: ActionTypes.SET_API_LOADED,
      payload: true,
    });
  });
});
