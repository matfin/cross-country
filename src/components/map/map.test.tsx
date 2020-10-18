import React from 'react';
import { render } from '@testing-library/react';
import { Waypoint } from 'models';
import * as googleServices from 'services/googlemaps';
import Map from './map';

describe('Map tests', (): void => {
  const defaultProps = {
    setApiLoaded: jest.fn(),
    setMap: jest.fn(),

    apiLoaded: false,
    map: {} as google.maps.Map<HTMLDivElement>,
  };
  const spyAddMarkerToMap = jest.spyOn(googleServices, 'addMarkerToMap').mockImplementation();
  const spyAddEventListeners = jest.spyOn(googleServices, 'addEventListeners').mockImplementation();
  const spyInitMap = jest.spyOn(googleServices, 'initMap').mockImplementation();
  const spyInitPolyline = jest.spyOn(googleServices, 'initPolyline').mockReturnValue({
    setMap: jest.fn(),
  } as any);
  const spyLoadGoogleMapsApi = jest.spyOn(googleServices, 'loadGoogleMapsApi').mockResolvedValue({} as any);

  beforeEach((): void => {
    spyAddMarkerToMap.mockClear();
    spyAddEventListeners.mockClear();
    spyLoadGoogleMapsApi.mockClear();
    spyInitMap.mockClear();
    spyInitPolyline.mockClear();
  });

  afterAll((): void => {
    spyAddMarkerToMap.mockReset();
    spyAddEventListeners.mockReset();
    spyLoadGoogleMapsApi.mockReset();
    spyInitMap.mockReset();
    spyInitPolyline.mockReset();
  });

  it('should render the component', (): void => {
    // given
    const { container } = render(<Map {...defaultProps} />);

    // then
    expect(container).toBeTruthy();
  });

  it('will add event listeners if can edit is true and the map is present', (): void => {
    // given
    render(<Map {...defaultProps} map={null} />);

    // then
    expect(spyAddEventListeners).not.toHaveBeenCalled();

    // given
    render(<Map {...defaultProps} canEdit />);

    // then
    expect(spyAddEventListeners).toHaveBeenCalled();
  });

  it('should load the google maps api only once and set up the map', async (): Promise<void> => {
    // given
    const spySetMap = jest.fn();

    render(<Map {...defaultProps} apiLoaded setMap={spySetMap} />);

    // then
    expect(spyLoadGoogleMapsApi).not.toHaveBeenCalled();
    expect(spyInitMap).toHaveBeenCalled();
    expect(spySetMap).toHaveBeenCalled();
  });

  it('should add markers to the map create a polyline from waypoints', (): void => {
    // given
    const spySetPolylineMap = jest.fn();

    spyInitPolyline.mockReturnValue({
      setMap: spySetPolylineMap,
    } as any);

    const spyWaypointsToLatLng = jest
      .spyOn(googleServices, 'waypointsToLatLng')
      .mockReturnValue([{ lat: 10.0, lng: 10.0 } as any, { lat: 20.0, lng: 20.0 } as any]);
    const { rerender } = render(<Map {...defaultProps} apiLoaded waypoints={[{}, {}] as Waypoint[]} />);

    // then
    expect(spyInitPolyline).toHaveBeenCalled();
    expect(spySetPolylineMap).toHaveBeenNthCalledWith(1, {});
    expect(spyAddMarkerToMap).toHaveBeenCalledTimes(2);

    // rerender
    rerender(<Map {...defaultProps} apiLoaded waypoints={[{}, {}, {}] as Waypoint[]} />);
    expect(spySetPolylineMap).toHaveBeenNthCalledWith(2, null);

    // cleanup
    spyWaypointsToLatLng.mockRestore();
  });
});
