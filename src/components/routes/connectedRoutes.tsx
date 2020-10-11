import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'models';
import { addRoute, deleteRoute, RoutesActionTypes } from './actions';
import Routes, { Props } from './routes';

const mapStateToProps = (state: any) => ({
  error: state.routesState.error,
  pending: state.routesState.pending,
  routes: state.routesState.routes,
});

const mapDispatchToProps = (dispatch: Dispatch<RoutesActionTypes>) => ({
  addRoute: (route: Route): void => {
    dispatch<any>(addRoute(route));
  },
  deleteRoute: (route: Route): void => {
    dispatch<any>(deleteRoute(route));
  },
});

const component = (props: Props): JSX.Element => <Routes {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(component);
