import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Waypoint } from 'models';
import WaypointTile, { Props } from './waypointTile';

const waypoint: Waypoint = {
  id: '123',
  note: 'Test note',
  position: {
    lat: 10.0,
    lng: 11.0,
  },
};

describe('WaypointTile tests', (): void => {
  const defaultProps: Props = {
    onClickDelete: jest.fn(),
    waypoint,
  };

  it('renders the component with the correct note', (): void => {
    // given
    const { getByText } = render(<WaypointTile {...defaultProps} />);

    // then
    expect(getByText('Test note')).toBeTruthy();
  });

  it('executes a callback on click delete', (): void => {
    // given
    const spyOnClickDelete = jest.fn();
    const { getByTestId } = render(<WaypointTile {...defaultProps} onClickDelete={spyOnClickDelete} />);

    // then
    fireEvent.click(getByTestId('delete-waypoint'));
    expect(spyOnClickDelete).toHaveBeenCalledWith(waypoint);
  });
});
