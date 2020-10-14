import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Route } from 'models';
import { renderWithRouter } from 'utils/testutils';
import RouteTile, { Props } from './routeTile';

describe('RouteTile tests', (): void => {
  const route: Route = {
    dateCreated: new Date(),
    id: '1234',
    slug: 'test-route',
    title: 'Test Route',
  };
  const defaultProps: Props = {
    onClickDelete: jest.fn(),
    route,
  };

  it('should render the component with the correct details', (): void => {
    // given
    const { container, getByText } = renderWithRouter(<RouteTile {...defaultProps} />);

    // then
    expect(container).toBeTruthy();
    expect(getByText('Test Route')).toBeTruthy();
  });

  it('should act when clicking on the delete icon', (): void => {
    // given
    const spyOnClickDelete = jest.fn();
    const { getByTestId } = renderWithRouter(<RouteTile {...defaultProps} onClickDelete={spyOnClickDelete} />);

    // then
    fireEvent.click(getByTestId('delete'));
    expect(spyOnClickDelete).toHaveBeenCalledWith(route);
  });
});
