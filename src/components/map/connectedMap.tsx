import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MapActionTypes, setApiLoaded, setMap } from './actions';
import Map, { Props } from './map';

const mapStateToProps = (state: any) => ({
  apiLoaded: state.mapState.apiLoaded,
  map: state.mapState.map,
});

const mapDispatchToProps = (dispatch: Dispatch<MapActionTypes>) => ({
  setApiLoaded: (apiLoaded: boolean): void => {
    dispatch<any>(setApiLoaded(apiLoaded));
  },
  setMap: (map: google.maps.Map<HTMLDivElement>): void => {
    dispatch<any>(setMap(map));
  },
});

const component = (props: Props): JSX.Element => <Map {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(component);
