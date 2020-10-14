import React, { useCallback } from 'react';
import { Waypoint } from 'models';
import { Container, DeleteButton, DeleteIcon, Note } from './waypointTile.css';

export interface Props {
  waypoint: Waypoint;
  onClickDelete: (waypoint: Waypoint) => void;
}

const WaypointTile = ({ onClickDelete, waypoint }: Props): JSX.Element => {
  const { id, note } = waypoint;
  const cbOnClickDelete = useCallback((): void => {
    onClickDelete(waypoint);
  }, [id]);

  return (
    <Container>
      <Note>{note}</Note>
      <DeleteButton data-testid="delete-waypoint" onClick={cbOnClickDelete}>
        <DeleteIcon />
      </DeleteButton>
    </Container>
  );
};

export default WaypointTile;
