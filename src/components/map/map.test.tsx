import React from 'react';
import { render } from '@testing-library/react';
import { Waypoint } from 'models';
import * as googleServices from 'services/googlemaps';
import Map from './map';

describe('Map tests', (): void => {
  const defaultProps = {
    setApiLoaded: jest.fn(),
    apiLoaded: false,
    waypoints: [],
  };
  const spyAddEventListeners = jest.spyOn(googleServices, 'addEventListeners').mockImplementation();
  const spyAddMarkers = jest.spyOn(googleServices, 'addMarkers').mockImplementation();
  const spyInitMap = jest.spyOn(googleServices, 'initMap').mockImplementation();
  const spyLoadGoogleMapsApi = jest.spyOn(googleServices, 'loadGoogleMapsApi').mockResolvedValue({} as any);

  beforeEach((): void => {
    spyAddEventListeners.mockClear();
    spyAddMarkers.mockClear();
    spyLoadGoogleMapsApi.mockClear();
    spyInitMap.mockClear();
  });

  afterAll((): void => {
    spyAddEventListeners.mockReset();
    spyAddMarkers.mockReset();
    spyLoadGoogleMapsApi.mockReset();
    spyInitMap.mockReset();
  });

  it('should render the component', (): void => {
    // given
    const { container } = render(<Map {...defaultProps} />);

    // then
    expect(container).toBeTruthy();
  });

  it('should load the google maps api only once and set up the map', async (): Promise<void> => {
    // given
    render(<Map {...defaultProps} apiLoaded />);

    // then
    expect(spyLoadGoogleMapsApi).not.toHaveBeenCalled();
    expect(spyInitMap).toHaveBeenCalled();
  });

  it('should add markers given waypoints', (): void => {
    // given
    spyInitMap.mockReturnValue({} as any);
    const waypoints: Waypoint[] = [
      {
        id: '123',
        position: {
          lat: 50.0,
          lng: 50.0,
        },
      },
    ];
    render(<Map {...defaultProps} apiLoaded waypoints={waypoints} />);

    // then
    expect(spyAddMarkers).toHaveBeenCalledWith({}, waypoints);
  });
});
