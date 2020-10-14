import ActionTypes from './actionTypes';
import { MapState, ReduxAction } from 'models';

export const initialState: MapState = {
  apiLoaded: false,
  map: null,
};

const reducer = (state: MapState = initialState, { payload, type }: ReduxAction): MapState => {
  switch (type) {
    case ActionTypes.SET_API_LOADED: {
      const apiLoaded: boolean = payload;

      return {
        ...state,
        apiLoaded,
      };
    }

    case ActionTypes.SET_MAP: {
      const map: google.maps.Map<HTMLDivElement> = payload;

      return {
        ...state,
        map,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
