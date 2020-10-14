import React, { useEffect, useRef } from 'react';
import { Waypoint } from 'models';
import { addEventListeners, initMap, loadGoogleMapsApi } from 'services/googlemaps';
import { Container } from './map.css';

export interface Props {
  setApiLoaded(apiLoaded: boolean): void;
  setMap(map: google.maps.Map<HTMLDivElement>): void;

  apiLoaded: boolean;
  className?: string;
  map: google.maps.Map<HTMLDivElement>;
  waypoints?: Waypoint[];
}

const Map = ({ apiLoaded, className, map, setApiLoaded, setMap, waypoints = [] }: Props): JSX.Element => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect((): void => {
    if (!apiLoaded) {
      loadGoogleMapsApi().then((): void => {
        setApiLoaded(true);
      });
    }

    if (apiLoaded && mapRef.current) {
      const map = initMap(mapRef.current);

      setMap(map);
    }
  }, [apiLoaded, mapRef]);

  useEffect((): void => {
    if (map) {
      addEventListeners(map);
    }
  }, [map]);

  return <Container className={className} ref={mapRef} />;
};

export default Map;
