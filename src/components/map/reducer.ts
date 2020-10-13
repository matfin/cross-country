import ActionTypes from './actionTypes';
import { MapState, ReduxAction } from 'models';

export const initialState: MapState = {
  apiLoaded: false,
};

const reducer = (state: MapState = initialState, { payload, type }: ReduxAction): MapState => {
  switch (type) {
    case ActionTypes.SET_API_LOADED: {
      const apiLoaded = payload;

      return {
        ...state,
        apiLoaded,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
