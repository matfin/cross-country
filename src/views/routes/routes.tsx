import React from 'react';
import { Route } from 'models';
import RouteTile from 'components/routeTile/routeTile';
import { AddRoute, Button, Container, Heading, Input, Map, RouteList, Sidebar } from './routes.css';

export interface Props {
  addRoute(): void;
  deleteRoute(route: Route): void;
  updateNewRouteTitle(title: string): void;

  className?: string;
  newRouteTitle: string;
  pending: boolean;
  routes: Route[];
}

const Routes = ({
  addRoute,
  className,
  deleteRoute,
  newRouteTitle,
  routes,
  updateNewRouteTitle,
}: Props): JSX.Element => {
  const onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    updateNewRouteTitle(value);
  };

  return (
    <Container className={className}>
      <Sidebar>
        <Heading>Your Routes</Heading>
        <RouteList>
          {routes?.map((item: Route) => (
            <RouteTile key={item.id} route={item} onClickDelete={deleteRoute} />
          ))}
        </RouteList>
        <AddRoute>
          <Input onChange={onInputChange} placeholder="Add a new route" value={newRouteTitle} />
          <Button onClick={addRoute}>
            <span>Add</span>
          </Button>
        </AddRoute>
      </Sidebar>
      <Map />
    </Container>
  );
};

export default Routes;
