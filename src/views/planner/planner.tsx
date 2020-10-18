import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MarkerUpdatedDetail, Route, Waypoint } from 'models';
import { useMarkerAdded, useMarkerUpdated } from 'hooks/useMap';
import { addMarkerDragEndListener, deleteMarkerFromMap } from 'services/googlemaps';
import { downloadGPX } from 'services/gpx';
import WaypointTile from 'components/waypointTile/waypointTile';
import { Button, Container, Heading, Map, Message, Sidebar, WaypointList } from './planner.css';

export interface Props {
  className?: string;
  map: google.maps.Map | null;
  route: Route | null;

  addWaypoint(waypoint: Waypoint): void;
  deleteWaypoint(waypoint: Waypoint): void;
  resetPlanner(): void;
  saveRoute(route: Route): void;
  setCurrentRoute(slug: string): void;
  updateWaypoint(coordinate: google.maps.LatLngLiteral, uuid: string): void;
}

export const hasWaypoints = (route: Route | null): boolean => Boolean(route) && (route?.waypoints ?? []).length > 0;

export const Planner = ({
  addWaypoint,
  className,
  deleteWaypoint,
  resetPlanner,
  route,
  saveRoute,
  setCurrentRoute,
  updateWaypoint,
}: Props): JSX.Element => {
  const waypoints: Waypoint[] = route?.waypoints ?? [];
  const { slug } = useParams<{ slug?: string }>();

  const onClickDeleteWaypoint = (waypoint: Waypoint): void => {
    const { marker } = waypoint;

    deleteMarkerFromMap(marker);
    deleteWaypoint(waypoint);
  };
  const onClickDownload = (): void => downloadGPX(route, waypoints);

  useEffect((): void => {
    if (slug) {
      setCurrentRoute(slug);
    }
  }, [slug]);

  useEffect((): void => {
    if (route) {
      saveRoute(route);
    }
  }, [route]);

  useEffect((): (() => void) => {
    return (): void => resetPlanner();
  }, []);

  useMarkerAdded((e: CustomEvent<google.maps.Marker>): void => {
    const marker: google.maps.Marker = e.detail;
    const id: string = uuidv4();
    const waypoint: Waypoint = {
      dateUpdated: new Date(),
      id,
      marker,
    };

    addMarkerDragEndListener(marker, id);
    addWaypoint(waypoint);
  });

  useMarkerUpdated((e: CustomEvent<MarkerUpdatedDetail>): void => {
    const { coordinate, uuid } = e.detail;

    updateWaypoint(coordinate, uuid);
  });

  return (
    <Container className={className}>
      <Sidebar>
        <Heading>{route?.title}</Heading>
        {!hasWaypoints(route) ? (
          <Message data-testid="message">It looks like you have no waypoints. Click the map to add some!</Message>
        ) : (
          <></>
        )}
        <WaypointList>
          {waypoints.map((waypoint: Waypoint, idx: number) => (
            <WaypointTile
              key={waypoint.id}
              onClickDelete={onClickDeleteWaypoint}
              waypoint={{ ...waypoint, note: waypoint.note ?? `Waypoint ${idx + 1}` }}
            />
          ))}
        </WaypointList>
        {hasWaypoints(route) ? <Button onClick={onClickDownload}>Download Route</Button> : <></>}
      </Sidebar>
      <Map canEdit={true} waypoints={waypoints} />
    </Container>
  );
};

export default Planner;
