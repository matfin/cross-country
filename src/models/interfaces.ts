export interface MapPosition {
  lat: number;
  lng: number;
}

export interface Waypoint {
  id: string;
  note?: string;
  marker: google.maps.Marker;
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
  error?: any;
  payload?: any;
  type: string;
}

export interface PlannerState {
  waypoints: Waypoint[];
}

export interface RoutesState {
  currentRoute: Route | null;
  error: any;
  newRouteTitle: string;
  pending: boolean;
  routes: Route[];
}

export interface MapState {
  apiLoaded: boolean;
  map: google.maps.Map | null;
}
