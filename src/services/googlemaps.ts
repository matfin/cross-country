import { MapPosition } from 'models';

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

export const dispatchEventMarkerAdded = (marker: google.maps.Marker): void => {
  const markerAddedEvent: CustomEvent = new CustomEvent<google.maps.Marker>('map:markerAdded', { detail: marker });

  window.dispatchEvent(markerAddedEvent);
};

export const addMarkerToMap = ({ latLng }: google.maps.MouseEvent, map: google.maps.Map): google.maps.Marker => {
  const { lat, lng } = latLng;
  const position: MapPosition = {
    lat: lat(),
    lng: lng(),
  };

  return new google.maps.Marker({
    position,
    map,
  });
};

export const deleteMarkerFromMap = (marker: google.maps.Marker): void => {
  marker.setMap(null);
};

export const addEventListeners = (map: google.maps.Map<HTMLDivElement>): void => {
  map.addListener('click', (e: google.maps.MouseEvent): void => {
    const marker = addMarkerToMap(e, map);

    dispatchEventMarkerAdded(marker);
  });
};
