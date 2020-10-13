import { useEffect } from 'react';
import { MapPosition } from 'models';

const useMapClick = (cb: (e: CustomEvent<MapPosition>) => void): void => {
  useEffect((): (() => void) => {
    window.addEventListener('map:onclick', cb as EventListener);

    return (): void => window.removeEventListener('map:onclick', cb as EventListener);
  }, [cb]);
};

export default useMapClick;
