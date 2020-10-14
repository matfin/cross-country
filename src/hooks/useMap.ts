import { useEffect } from 'react';
// import { MapPosition } from 'models';

// const useMapClick = (cb: (e: CustomEvent<MapPosition>) => void): void => {
//   useEffect((): (() => void) => {
//     window.addEventListener('map:onclick', cb as EventListener);

//     return (): void => window.removeEventListener('map:onclick', cb as EventListener);
//   }, [cb]);
// };

// export default useMapClick;

export const useMarkerAdded = (cb: (e: CustomEvent<google.maps.Marker>) => void): void => {
  useEffect((): (() => void) => {
    window.addEventListener('map:markerAdded', cb as EventListener);

    return (): void => window.removeEventListener('map:markerAdded', cb as EventListener);
  });
};
