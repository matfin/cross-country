import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from 'models';
import { MapActionTypes, setApiLoaded, setMap } from './actions';
import Map, { Props } from './map';

const mapStateToProps = (state: AppState) => ({
  apiLoaded: state.mapState.apiLoaded,
  map: state.mapState.map,
});

const mapDispatchToProps = (dispatch: Dispatch<MapActionTypes>) => ({
  setApiLoaded: (apiLoaded: boolean): void => {
    dispatch<MapActionTypes>(setApiLoaded(apiLoaded));
  },
  setMap: (map: google.maps.Map<HTMLDivElement>): void => {
    dispatch<MapActionTypes>(setMap(map));
  },
});

const component = (props: Props): JSX.Element => <Map {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(component);
