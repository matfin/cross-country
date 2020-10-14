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
    waypoints: [],
  };
  const spyAddEventListeners = jest.spyOn(googleServices, 'addEventListeners').mockImplementation();
  const spyInitMap = jest.spyOn(googleServices, 'initMap').mockImplementation();
  const spyLoadGoogleMapsApi = jest.spyOn(googleServices, 'loadGoogleMapsApi').mockResolvedValue({} as any);

  beforeEach((): void => {
    spyAddEventListeners.mockClear();
    spyLoadGoogleMapsApi.mockClear();
    spyInitMap.mockClear();
  });

  afterAll((): void => {
    spyAddEventListeners.mockReset();
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
    const spySetMap = jest.fn();

    render(<Map {...defaultProps} apiLoaded setMap={spySetMap} />);

    // then
    expect(spyLoadGoogleMapsApi).not.toHaveBeenCalled();
    expect(spyInitMap).toHaveBeenCalled();
    expect(spySetMap).toHaveBeenCalled();
  });
});
