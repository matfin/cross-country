export interface MapPosition {
  lat: number;
  lng: number;
}

export interface Waypoint {
  dateUpdated: Date;
  id: string;
  note?: string;
  marker: google.maps.Marker;
}

export interface MarkerUpdatedDetail {
  coordinate: google.maps.LatLngLiteral;
  uuid: string;
}

export interface Route {
  dateCreated: Date;
  id: string;
  note?: string;
  slug: string;
  title: string;
  waypoints?: Waypoint[];
}

export interface ReduxAction {
  error?: Error;
  payload?: unknown;
  type: string;
}

export interface PlannerState {
  waypoints: Waypoint[];
}

export interface RoutesState {
  currentRoute: Route | null;
  error: Error;
  newRouteTitle: string;
  pending: boolean;
  routes: Route[];
}

export interface MapState {
  apiLoaded: boolean;
  map: google.maps.Map<HTMLDivElement> | null;
}

export interface AppState {
  mapState: MapState;
  plannerState: PlannerState;
  routesState: RoutesState;
}
