import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, Waypoint } from 'models';
import { resetCurrentRoute, setCurrentRoute, RoutesActionTypes } from 'views/routes/actions';
import { addWaypoint, deleteWaypoint, PlannerActionTypes, updateWaypoint } from './actions';
import Planner, { Props } from './planner';

const mapStateToProps = (state: AppState) => ({
  map: state.mapState.map,
  route: state.routesState.currentRoute,
  waypoints: state.plannerState.waypoints,
});

const mapDispatchToProps = (dispatch: Dispatch<RoutesActionTypes | PlannerActionTypes>) => ({
  addWaypoint: (marker: google.maps.Marker): void => {
    dispatch<PlannerActionTypes>(addWaypoint(marker));
  },
  deleteWaypoint: (waypoint: Waypoint): void => {
    dispatch<PlannerActionTypes>(deleteWaypoint(waypoint));
  },
  resetCurrentRoute: (): void => {
    dispatch<RoutesActionTypes>(resetCurrentRoute());
  },
  setCurrentRoute: (slug: string): void => {
    dispatch<RoutesActionTypes>(setCurrentRoute(slug));
  },
  updateWaypoint: (coordinate: google.maps.LatLngLiteral, uuid: string): void => {
    dispatch<PlannerActionTypes>(updateWaypoint(coordinate, uuid));
  },
});

const component = (props: Props): JSX.Element => <Planner {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(component);
