import React, { useEffect } from 'react';
import { Container, Map, Sidebar } from './routes.css';

interface Props {
  className?: string;
}

const Routes = ({ className }: Props): JSX.Element => {
  useEffect((): void => {
    console.info('Routes component loaded!');
  }, []);

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
