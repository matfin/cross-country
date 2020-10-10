import React, { useEffect } from 'react';
import { Container } from './map.css';

interface Props {
  className?: string;
}

const Map = ({ className }: Props): JSX.Element => {
  useEffect((): void => {
    console.info('Map has been rendered!');
  }, []);

  return <Container className={className}>Map goes in here</Container>;
};

export default Map;
