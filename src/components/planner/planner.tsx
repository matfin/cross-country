import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPosition, Route, Waypoint } from 'models';
import useMapClick from 'hooks/useMapClick';
import { Container, Heading, Map, Sidebar, WaypointList } from './planner.css';

export interface Props {
  className?: string;
  route: Route | null;
  waypoints: Waypoint[];

  addWaypoint(position: MapPosition): void;
  resetCurrentRoute(): void;
  setCurrentRoute(slug: string): void;
}

const Planner = ({
  addWaypoint,
  className,
  resetCurrentRoute,
  route,
  setCurrentRoute,
  waypoints,
}: Props): JSX.Element => {
  const { slug } = useParams<{ slug?: string }>();

  useEffect((): (() => void) => {
    if (slug) {
      setCurrentRoute(slug);
    }

    return (): void => resetCurrentRoute();
  }, [slug]);

  useMapClick((e: CustomEvent<MapPosition>): void => {
    const position: MapPosition = e.detail;

    addWaypoint(position);
  });

  return (
    <Container className={className}>
      <Sidebar>
        <Heading>{route?.title}</Heading>
        <WaypointList />
      </Sidebar>
      <Map waypoints={waypoints} />
    </Container>
  );
};

export default Planner;
