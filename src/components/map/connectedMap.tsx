import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MapActionTypes, setApiLoaded } from './actions';
import Map, { Props } from './map';

const mapStateToProps = (state: any) => ({
  apiLoaded: state.mapState.apiLoaded,
});

const mapDispatchToProps = (dispatch: Dispatch<MapActionTypes>) => ({
  setApiLoaded: (apiLoaded: boolean) => {
    dispatch<any>(setApiLoaded(apiLoaded));
  },
});

const component = (props: Props): JSX.Element => <Map {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(component);
