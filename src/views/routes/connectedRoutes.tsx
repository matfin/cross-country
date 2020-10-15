import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'models';
import { addRoute, deleteRoute, updateNewRouteTitle, RoutesActionTypes } from './actions';
import Routes, { Props } from './routes';

const mapStateToProps = (state: any) => ({
  error: state.routesState.error,
  newRouteTitle: state.routesState.newRouteTitle,
  pending: state.routesState.pending,
  routes: state.routesState.routes,
});

const mapDispatchToProps = (dispatch: Dispatch<RoutesActionTypes>) => ({
  addRoute: (): void => {
    dispatch<any>(addRoute());
  },
  deleteRoute: (route: Route): void => {
    dispatch<any>(deleteRoute(route));
  },
  updateNewRouteTitle: (title: string): void => {
    dispatch<any>(updateNewRouteTitle(title));
  },
});

const component = (props: Props): JSX.Element => <Routes {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(component);
