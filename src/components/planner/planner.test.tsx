import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import * as reactRouterDom from 'react-router-dom';
import { MapPosition, Route, Waypoint } from 'models';
import Planner from './planner';

jest.mock('react-router-dom', (): any => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ slug: 'test' }),
}));
// eslint-disable-next-line react/display-name
jest.mock('components/map/connectedMap', () => () => <></>);

describe('Planner tests', (): void => {
  const defaultProps = {
    route: null,
    waypoints: [],
    addWaypoint: jest.fn(),
    deleteWaypoint: jest.fn(),
    resetCurrentRoute: jest.fn(),
    setCurrentRoute: jest.fn(),
  };

  it('renders the route title', (): void => {
    // given
    const route = { title: 'Test Route' } as Route;
    const { getByText } = render(<Planner {...defaultProps} route={route} />);

    // then
    expect(getByText('Test Route')).toBeTruthy();
  });

  it('renders waypoints and deletes them on click of delete', (): void => {
    // given
    const spyDeleteWaypoint = jest.fn();
    const waypoints: Waypoint[] = [
      {
        id: '1234',
        note: 'Test Waypoint One',
        position: {
          lat: 1.0,
          lng: 2.0,
        },
      },
      {
        id: '5678',
        position: {
          lat: 1.0,
          lng: 2.0,
        },
      },
    ];
    const { getAllByTestId, getByText } = render(
      <Planner {...defaultProps} deleteWaypoint={spyDeleteWaypoint} waypoints={waypoints} />,
    );

    // then
    expect(getByText('Test Waypoint One')).toBeTruthy();
    expect(getByText('Waypoint 2')).toBeTruthy();

    fireEvent.click(getAllByTestId('delete-waypoint')[0]);

    expect(spyDeleteWaypoint).toHaveBeenCalledWith(waypoints[0]);
  });

  it('renders the component and sets the current route, then reset the route on unmount', async (): Promise<void> => {
    // given
    const spySetCurrentRoute = jest.fn();
    const spyResetCurrentRoute = jest.fn();
    const { unmount } = render(
      <Planner {...defaultProps} resetCurrentRoute={spyResetCurrentRoute} setCurrentRoute={spySetCurrentRoute} />,
    );

    // then
    expect(spySetCurrentRoute).toHaveBeenCalledWith('test');

    // given
    unmount();

    // then
    expect(spyResetCurrentRoute).toHaveBeenCalled();
  });

  it('does not set the current route without a slug', (): void => {
    // given
    const spyUseParams = jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ slug: undefined });
    const spySetCurrentRoute = jest.fn();

    // spyUseParams.mockReturnValue({ slug: undefined });
    render(<Planner {...defaultProps} setCurrentRoute={spySetCurrentRoute} />);

    // then
    expect(spySetCurrentRoute).not.toHaveBeenCalled();

    // cleanup
    spyUseParams.mockRestore();
  });

  it('calls to add a waypoint on map click', (): void => {
    // given
    const spyUseParams = jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ slug: 'test' });
    const spyAddWaypoint = jest.fn();
    const position: MapPosition = { lat: 10, lng: 10 };
    render(<Planner {...defaultProps} addWaypoint={spyAddWaypoint} />);

    // then
    fireEvent(
      window,
      new CustomEvent<MapPosition>('map:onclick', { detail: position }),
    );
    expect(spyAddWaypoint).toHaveBeenCalledWith(position);

    // cleanup
    spyUseParams.mockRestore();
  });
});
