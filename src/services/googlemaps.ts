import { MapPosition, Waypoint } from 'models';

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

export const dispatchMapClickedAtPosition = ({ latLng: { lat, lng } }: google.maps.MouseEvent): void => {
  const position: MapPosition = {
    lat: lat(),
    lng: lng(),
  };
  const mapClickedEvent: CustomEvent = new CustomEvent<MapPosition>('map:onclick', { detail: position });

  window.dispatchEvent(mapClickedEvent);
};

export const addMarkers = (map: google.maps.Map<HTMLDivElement>, waypoints: Waypoint[]): void => {
  waypoints.forEach((waypoint: Waypoint): void => {
    const { position } = waypoint;

    new google.maps.Marker({
      position,
      map,
    });
  });
};

export const addEventListeners = (map: google.maps.Map<HTMLDivElement>): void => {
  map.addListener('click', dispatchMapClickedAtPosition);
};
