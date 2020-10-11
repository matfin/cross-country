import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from 'utils/testutils';
import { Route } from 'models';
import Routes, { Props } from './routes';

describe('Routes tests', (): void => {
  const routes: Route[] = [
    {
      dateCreated: new Date(),
      id: '1234',
      slug: 'test-route-one',
      title: 'Test Route One',
    },
    {
      dateCreated: new Date(),
      id: '5678',
      slug: 'test-route-two',
      title: 'Test Route Two',
    },
  ];
  const defaultProps: Props = {
    addRoute: jest.fn(),
    deleteRoute: jest.fn(),
    updateNewRouteTitle: jest.fn(),

    newRouteTitle: '',
    pending: false,
    routes,
  };

  it('renders the component with route tiles', (): void => {
    // given
    const { container, getByText } = renderWithRouter(<Routes {...defaultProps} />);

    // then
    expect(container).toBeTruthy();
    expect(getByText('Test Route One')).toBeTruthy();
    expect(getByText('Test Route Two')).toBeTruthy();
  });

  it('should update the title for a new route', (): void => {
    // given
    const spyUpdateNewRouteTitle = jest.fn();
    const { getByTestId } = renderWithRouter(<Routes {...defaultProps} updateNewRouteTitle={spyUpdateNewRouteTitle} />);

    // then
    fireEvent.change(getByTestId('input'), {
      target: {
        value: 'New Route',
      },
    });
    expect(spyUpdateNewRouteTitle).toHaveBeenCalledWith('New Route');
  });

  it('should call to add a route on button click', (): void => {
    // given
    const spyAddRoute = jest.fn();
    const { getByTestId } = renderWithRouter(<Routes {...defaultProps} addRoute={spyAddRoute} />);

    // then
    fireEvent.click(getByTestId('button'));
    expect(spyAddRoute).toHaveBeenCalled();
  });

  it('should call to delete a route', (): void => {
    const spyDeleteRoute = jest.fn();
    const { getAllByTestId } = renderWithRouter(<Routes {...defaultProps} deleteRoute={spyDeleteRoute} />);

    // then
    fireEvent.click(getAllByTestId('delete')[0]);
    expect(spyDeleteRoute).toHaveBeenCalledWith(routes[0]);
  });
});
