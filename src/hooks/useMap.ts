import { useEffect } from 'react';
import { MarkerUpdatedDetail } from 'models';

export const useMarkerAdded = (cb: (e: CustomEvent<google.maps.Marker>) => void): void => {
  useEffect((): (() => void) => {
    window.addEventListener('map:markerAdded', cb as EventListener);

    return (): void => window.removeEventListener('map:markerAdded', cb as EventListener);
  });
};

export const useMarkerUpdated = (cb: (e: CustomEvent<MarkerUpdatedDetail>) => void): void => {
  useEffect((): (() => void) => {
    window.addEventListener('map:markerUpdated', cb as EventListener);

    return (): void => window.removeEventListener('map:markerUpdated', cb as EventListener);
  });
};
