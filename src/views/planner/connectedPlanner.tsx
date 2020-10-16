import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, Route, Waypoint } from 'models';
import { RoutesActionTypes } from 'views/routes/actions';
import {
  addWaypoint,
  deleteWaypoint,
  PlannerActionTypes,
  resetPlanner,
  setCurrentRoute,
  updateWaypoint,
} from './actions';
import { saveRoute } from 'views/routes/actions';
import Planner, { Props } from './planner';

const mapStateToProps = (state: AppState) => ({
  map: state.mapState.map,
  route: state.plannerState.route,
});

const mapDispatchToProps = (dispatch: Dispatch<RoutesActionTypes | PlannerActionTypes>) => ({
  addWaypoint: (waypoint: Waypoint): void => {
    dispatch<PlannerActionTypes>(addWaypoint(waypoint));
  },
  deleteWaypoint: (waypoint: Waypoint): void => {
    dispatch<PlannerActionTypes>(deleteWaypoint(waypoint));
  },
  resetPlanner: (): void => {
    dispatch<PlannerActionTypes>(resetPlanner());
  },
  saveRoute: (route: Route): void => {
    dispatch<RoutesActionTypes>(saveRoute(route));
  },
  setCurrentRoute: (slug: string): void => {
    dispatch<any>(setCurrentRoute(slug));
  },
  updateWaypoint: (coordinate: google.maps.LatLngLiteral, uuid: string): void => {
    dispatch<PlannerActionTypes>(updateWaypoint(coordinate, uuid));
  },
});

const component = (props: Props): JSX.Element => <Planner {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(component);
