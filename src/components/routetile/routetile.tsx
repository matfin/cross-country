import React, { useCallback } from 'react';
import { Route } from 'models';
import { Container, DeleteButton, DeleteIcon, TitleLink } from './routeTile.css';

export interface Props {
  onClickDelete: (route: Route) => void;
  route: Route;
}

const RouteTile = ({ onClickDelete, route }: Props): JSX.Element => {
  const { id, slug, title } = route;
  const cbOnClickDelete = useCallback((): void => {
    onClickDelete(route);
  }, [id]);
  const url = `routes/${slug}`;

  return (
    <Container>
      <TitleLink to={url}>{title}</TitleLink>
      <DeleteButton data-testid="delete" onClick={cbOnClickDelete}>
        <DeleteIcon />
      </DeleteButton>
    </Container>
  );
};

export default RouteTile;
