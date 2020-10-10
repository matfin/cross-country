import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Map, Sidebar } from './planner.css';

interface Props {
  className?: string;
  slug?: string;
}

const Planner = ({ className }: Props): JSX.Element => {
  const { slug } = useParams<{ slug?: string }>();

  useEffect((): void => {
    console.log(`We should load the planner with slug: ${slug}`);
  }, [slug]);

  return (
    <Container className={className}>
      <Sidebar>
        <p>Planner</p>
      </Sidebar>
      <Map />
    </Container>
  );
};

export default Planner;
