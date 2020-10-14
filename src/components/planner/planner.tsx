import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MarkerUpdatedDetail, Route, Waypoint } from 'models';
import { useMarkerAdded, useMarkerUpdated } from 'hooks/useMap';
import { deleteMarkerFromMap } from 'services/googlemaps';
import WaypointTile from 'components/waypointTile/waypointTile';
import { Container, Heading, Map, Sidebar, WaypointList } from './planner.css';

export interface Props {
  className?: string;
  map: google.maps.Map | null;
  route: Route | null;
  waypoints: Waypoint[];

  addWaypoint(marker: google.maps.Marker): void;
  deleteWaypoint(waypoint: Waypoint): void;
  resetCurrentRoute(): void;
  setCurrentRoute(slug: string): void;
  updateWaypoint(coordinate: google.maps.LatLngLiteral, uuid: string): void;
}

const Planner = ({
  addWaypoint,
  className,
  deleteWaypoint,
  resetCurrentRoute,
  route,
  setCurrentRoute,
  updateWaypoint,
  waypoints,
}: Props): JSX.Element => {
  const { slug } = useParams<{ slug?: string }>();
  const onClickDeleteWaypoint = (waypoint: Waypoint): void => {
    const { marker } = waypoint;

    deleteMarkerFromMap(marker);
    deleteWaypoint(waypoint);
  };

  useEffect((): (() => void) => {
    if (slug) {
      setCurrentRoute(slug);
    }

    return (): void => resetCurrentRoute();
  }, [slug]);

  useMarkerAdded((e: CustomEvent<google.maps.Marker>): void => {
    const marker: google.maps.Marker = e.detail;

    addWaypoint(marker);
  });

  useMarkerUpdated((e: CustomEvent<MarkerUpdatedDetail>): void => {
    const { coordinate, uuid } = e.detail;

    updateWaypoint(coordinate, uuid);
  });

  return (
    <Container className={className}>
      <Sidebar>
        <Heading>{route?.title}</Heading>
        <WaypointList>
          {waypoints.map((waypoint: Waypoint, idx: number) => (
            <WaypointTile
              key={waypoint.id}
              onClickDelete={onClickDeleteWaypoint}
              waypoint={{ ...waypoint, note: waypoint.note ?? `Waypoint ${idx + 1}` }}
            />
          ))}
        </WaypointList>
      </Sidebar>
      <Map canEdit={true} waypoints={waypoints} />
    </Container>
  );
};

export default Planner;
