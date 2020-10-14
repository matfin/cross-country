import { MapPosition, MarkerUpdatedDetail, Waypoint } from 'models';
import { colours } from 'styles';

export const loadGoogleMapsApi = async (): Promise<void | Error> =>
  new Promise((resolve, reject) => {
    const url = 'https://maps.googleapis.com/maps/api/js';
    const apiKey = 'AIzaSyCYNlxc36W_aGiQoKBh89-fQnXjtd4_Sp0';
    const scriptElement: HTMLScriptElement = document.createElement('script');

    scriptElement.src = `${url}?key=${apiKey}`;
    scriptElement.onload = (): void => resolve();
    scriptElement.onerror = (e): void => reject(e);

    document.body.appendChild(scriptElement);
  });

export const initMap = (
  mapRef: HTMLDivElement,
  centerPosition: MapPosition = { lat: 53.377177, lng: -6.075073 },
): google.maps.Map<HTMLDivElement> =>
  new google.maps.Map(mapRef as HTMLDivElement, {
    center: centerPosition,
    zoom: 12,
    mapTypeId: 'terrain',
  });

export const initPolyline = (coordinates: google.maps.LatLng[]): google.maps.Polyline =>
  new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: colours.mapLine,
    strokeOpacity: 0.6,
    strokeWeight: 2.0,
  });

export const dispatchEventMarkerAdded = (marker: google.maps.Marker): void => {
  const markerAddedEvent: CustomEvent = new CustomEvent<google.maps.Marker>('map:markerAdded', { detail: marker });

  window.dispatchEvent(markerAddedEvent);
};

export const dispatchEventMarkerCoordinateUpdated = (coordinate: google.maps.LatLngLiteral, uuid: string): void => {
  const detail: MarkerUpdatedDetail = {
    coordinate,
    uuid,
  };
  const markerUpdatedEvent: CustomEvent = new CustomEvent<MarkerUpdatedDetail>('map:markerUpdated', { detail });

  window.dispatchEvent(markerUpdatedEvent);
};

export const addMarkerToMap = ({ latLng }: google.maps.MouseEvent, map: google.maps.Map): google.maps.Marker => {
  const { lat, lng } = latLng;
  const position: MapPosition = {
    lat: lat(),
    lng: lng(),
  };

  return new google.maps.Marker({
    draggable: true,
    position,
    map,
  });
};

export const waypointsToLatLng = (waypoints: Waypoint[]): google.maps.LatLng[] => {
  const markers: google.maps.Marker[] = waypoints.map(({ marker }: Waypoint): google.maps.Marker => marker);
  const coordinates: (google.maps.LatLng | undefined | null)[] = markers.map((marker: google.maps.Marker):
    | google.maps.LatLng
    | null
    | undefined => marker.getPosition());

  return coordinates as google.maps.LatLng[];
};

export const deleteMarkerFromMap = (marker: google.maps.Marker): void => {
  marker.setMap(null);
};

export const addMarkerDragEndListener = (marker: google.maps.Marker, uuid: string): void => {
  marker.addListener('dragend', ({ latLng: { lat, lng } }: google.maps.MouseEvent): void => {
    const coord: google.maps.LatLngLiteral = {
      lat: lat(),
      lng: lng(),
    };

    dispatchEventMarkerCoordinateUpdated(coord, uuid);
  });
};

export const addEventListeners = (map: google.maps.Map<HTMLDivElement>): void => {
  map.addListener('click', (e: google.maps.MouseEvent): void => {
    const marker = addMarkerToMap(e, map);

    dispatchEventMarkerAdded(marker);
  });
};
