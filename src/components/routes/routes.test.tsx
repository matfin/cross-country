import React from 'react';
import { render } from '@testing-library/react';
import Routes, { Props } from './routes';

describe('Routes tests', (): void => {
  const defaultProps: Props = {
    addRoute: jest.fn(),
    deleteRoute: jest.fn(),
    pending: false,
    routes: [],
  };

  it('renders the component', (): void => {
    expect(render(<Routes {...defaultProps} />)).toBeTruthy();
  });
});
