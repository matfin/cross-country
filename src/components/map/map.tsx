import React, { useEffect, useRef, useState } from 'react';
import { Waypoint } from 'models';
import {
  addMarkerToMap,
  addEventListeners,
  initMap,
  initPolyline,
  loadGoogleMapsApi,
  waypointsToLatLng,
} from 'services/googlemaps';
import { Container } from './map.css';

export interface Props {
  setApiLoaded(apiLoaded: boolean): void;
  setMap(map: google.maps.Map<HTMLDivElement>): void;

  apiLoaded: boolean;
  canEdit?: boolean;
  className?: string;
  map: google.maps.Map<HTMLDivElement> | null;
  waypoints?: Waypoint[];
}

const Map = ({
  apiLoaded,
  canEdit = false,
  className,
  map,
  setApiLoaded,
  setMap,
  waypoints = [],
}: Props): JSX.Element => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [polyLine, setPolyLine] = useState<google.maps.Polyline | null>(null);

  useEffect((): void => {
    if (!apiLoaded) {
      loadGoogleMapsApi().then((): void => {
        setApiLoaded(true);
      });
    }

    if (apiLoaded && mapRef.current) {
      const map: google.maps.Map<HTMLDivElement> = initMap(mapRef.current);

      setMap(map);
    }
  }, [apiLoaded, mapRef]);

  useEffect((): void => {
    if (map && canEdit) {
      addEventListeners(map);
    }
  }, [map, canEdit]);

  useEffect((): void => {
    if (map && waypoints.length) {
      // grab the markers and coordinates
      const markers: google.maps.Marker[] = waypoints.map(({ marker }: Waypoint) => marker);
      const coords: google.maps.LatLng[] = waypointsToLatLng(waypoints);
      const newPolyLine = initPolyline(coords);

      // add the markers to the map
      markers.forEach((marker: google.maps.Marker): void => addMarkerToMap(marker, map));

      // if we have an existing polyline, nuke it
      if (polyLine) {
        polyLine.setMap(null);
        setPolyLine(null);
      }

      // then set the new poly line to the map and update the state
      newPolyLine.setMap(map);
      setPolyLine(newPolyLine);
    }
  }, [map, waypoints]);

  return <Container className={className} ref={mapRef} />;
};

export default Map;
