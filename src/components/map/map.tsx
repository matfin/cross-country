import React, { useEffect, useRef, useState } from 'react';
import { Waypoint } from 'models';
import { addEventListeners, addMarkers, initMap, loadGoogleMapsApi } from 'services/googlemaps';
import { Container } from './map.css';

export interface Props {
  setApiLoaded(apiLoaded: boolean): void;

  apiLoaded: boolean;
  className?: string;
  waypoints?: Waypoint[];
}

const Map = ({ apiLoaded, className, setApiLoaded, waypoints = [] }: Props): JSX.Element => {
  const [map, setMap] = useState<google.maps.Map<HTMLDivElement>>();
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

  useEffect((): void => {
    if (map) {
      addMarkers(map, waypoints);
    }
  }, [map, waypoints]);

  return <Container className={className} ref={mapRef} />;
};

export default Map;
