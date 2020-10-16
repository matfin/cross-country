import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import * as reactRouterDom from 'react-router-dom';
import * as googleServices from 'services/googlemaps';
import * as gpx from 'services/gpx';
import { MarkerUpdatedDetail, Route, Waypoint } from 'models';
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
    map: null,

    addWaypoint: jest.fn(),
    deleteWaypoint: jest.fn(),
    resetPlanner: jest.fn(),
    saveRoute: jest.fn(),
    setCurrentRoute: jest.fn(),
    updateWaypoint: jest.fn(),
  };
  const mockedMarker = {
    setMap: jest.fn(),
  } as any;
  const waypoints: Waypoint[] = [
    {
      id: '1234',
      dateUpdated: new Date('1982-04-26'),
      note: 'Test Waypoint One',
      marker: mockedMarker,
    },
    {
      id: '5678',
      dateUpdated: new Date('1983-05-27'),
      marker: mockedMarker,
    },
  ];
  const route: Route = {
    dateCreated: new Date('1982-04-26'),
    id: '1234',
    slug: 'test-slug',
    title: 'Test Route',
    waypoints,
  };

  it('renders the route title and welcome message but not the button', (): void => {
    // given
    const route = { title: 'Test Route' } as Route;
    const { getByTestId, getByText, queryByTestId } = render(<Planner {...defaultProps} route={route} />);

    // then
    expect(getByText('Test Route')).toBeTruthy();
    expect(getByTestId('message')).toBeTruthy();
    expect(queryByTestId('gpx-button')).toBeFalsy();
  });

  it('renders waypoints and the download button and deletes waypoints on click of delete', (): void => {
    // given
    const spyDeleteWaypoint = jest.fn();
    const spyDeleteMarkerFromMap = jest.spyOn(googleServices, 'deleteMarkerFromMap');
    const { getAllByTestId, getByText, queryByTestId } = render(
      <Planner {...defaultProps} deleteWaypoint={spyDeleteWaypoint} route={route} />,
    );

    // then
    expect(getByText('Test Waypoint One')).toBeTruthy();
    expect(getByText('Waypoint 2')).toBeTruthy();
    expect(queryByTestId('button')).toBeTruthy();

    fireEvent.click(getAllByTestId('delete-waypoint')[0]);

    expect(spyDeleteWaypoint).toHaveBeenCalledWith(waypoints[0]);
    expect(spyDeleteMarkerFromMap).toHaveBeenCalled();

    // cleanup
    spyDeleteMarkerFromMap.mockRestore();
  });

  it('renders the component and sets the current route, then resets on unmount', async (): Promise<void> => {
    // given
    const spySetCurrentRoute = jest.fn();
    const spyResetPlanner = jest.fn();
    const { unmount } = render(
      <Planner {...defaultProps} resetPlanner={spyResetPlanner} setCurrentRoute={spySetCurrentRoute} />,
    );

    // then
    expect(spySetCurrentRoute).toHaveBeenCalledWith('test');

    // given
    unmount();

    // then
    expect(spyResetPlanner).toHaveBeenCalled();
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
    const spyAddMarkerDragEndListener = jest.spyOn(googleServices, 'addMarkerDragEndListener').mockImplementation();
    const spyUseParams = jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ slug: 'test' });
    const spyAddWaypoint = jest.fn();

    render(<Planner {...defaultProps} addWaypoint={spyAddWaypoint} />);

    // then
    fireEvent(
      window,
      new CustomEvent<google.maps.Marker>('map:markerAdded', { detail: mockedMarker }),
    );
    expect(spyAddWaypoint).toHaveBeenCalledWith({
      dateUpdated: expect.any(Date),
      id: expect.any(String),
      marker: mockedMarker,
    });
    expect(spyAddMarkerDragEndListener).toHaveBeenCalledWith(mockedMarker, expect.any(String));

    // cleanup
    spyUseParams.mockRestore();
    spyAddMarkerDragEndListener.mockRestore();
  });

  it('calls to update a waypoint', (): void => {
    // given
    const coordinate: google.maps.LatLngLiteral = {
      lat: 23.0,
      lng: 22.0,
    };
    const uuid = '123';
    const spyUseParams = jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ slug: 'test' });
    const spyUpdateWaypoint = jest.fn();

    render(<Planner {...defaultProps} updateWaypoint={spyUpdateWaypoint} />);

    // then
    fireEvent(
      window,
      new CustomEvent<MarkerUpdatedDetail>('map:markerUpdated', {
        detail: { coordinate, uuid },
      }),
    );
    expect(spyUpdateWaypoint).toHaveBeenCalledWith(coordinate, uuid);

    // cleanup
    spyUseParams.mockRestore();
  });

  it('calls to download a GPX file on download button click', (): void => {
    // given
    const spyDownloadGPX = jest.spyOn(gpx, 'downloadGPX').mockImplementation();
    const spyUseParams = jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ slug: 'test' });
    const { getByTestId } = render(<Planner {...defaultProps} route={route} />);

    // then
    fireEvent.click(getByTestId('button'));
    expect(spyDownloadGPX).toHaveBeenCalled();

    // cleanup
    spyDownloadGPX.mockRestore();
    spyUseParams.mockRestore();
  });
});
