export interface Waypoint {
  lat: number;
  lon: number;
  note?: string;
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

export interface RoutesState {
  error: any;
  pending: boolean;
  routes: Route[];
}
