import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Route } from 'models';
import RouteTile from 'components/routetile/routetile';
import { Container, Map, Sidebar } from './routes.css';

export interface Props {
  addRoute(route: Route): void;
  deleteRoute(route: Route): void;

  className?: string;
  error?: any;
  pending: boolean;
  routes: Route[];
}

const Routes = ({ addRoute, className, routes }: Props): JSX.Element => {
  useEffect((): void => {
    const dummy: Route = {
      dateCreated: new Date(),
      id: uuid(),
      note: 'Test note',
      slug: 'test-route',
      title: 'Test Route',
    };

    addRoute(dummy);
  }, []);

  return (
    <Container className={className}>
      <Sidebar>
        {routes?.map((item: Route) => (
          <RouteTile key={item.id} route={item} onClickDelete={console.log} />
        ))}
      </Sidebar>
      <Map />
    </Container>
  );
};

export default Routes;
