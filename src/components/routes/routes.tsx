import React from 'react';
import { Container, Map, Sidebar } from './routes.css';

interface Props {
  className?: string;
}

const Routes = ({ className }: Props): JSX.Element => {
  return (
    <Container className={className}>
      <Sidebar>
        <p>Routes listing</p>
      </Sidebar>
      <Map />
    </Container>
  );
};

export default Routes;
