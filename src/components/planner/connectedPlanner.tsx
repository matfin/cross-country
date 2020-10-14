import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MapPosition, Waypoint } from 'models';
import { resetCurrentRoute, setCurrentRoute, RoutesActionTypes } from 'components/routes/actions';
import { addWaypoint, deleteWaypoint } from './actions';
import Planner, { Props } from './planner';

const mapStateToProps = (state: any) => ({
  route: state.routesState.currentRoute,
  waypoints: state.plannerState.waypoints,
});

const mapDispatchToProps = (dispatch: Dispatch<RoutesActionTypes>) => ({
  addWaypoint: (position: MapPosition): void => {
    dispatch<any>(addWaypoint(position));
  },
  deleteWaypoint: (waypoint: Waypoint): void => {
    dispatch<any>(deleteWaypoint(waypoint));
  },
  resetCurrentRoute: (): void => {
    dispatch<any>(resetCurrentRoute());
  },
  setCurrentRoute: (slug: string): void => {
    dispatch<any>(setCurrentRoute(slug));
  },
});

const component = (props: Props): JSX.Element => <Planner {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(component);
