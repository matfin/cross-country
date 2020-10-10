import React from 'react';
import { render } from '@testing-library/react';
import Routes from './routes';

describe('Routes tests', (): void => {
  it('renders the component', (): void => {
    expect(render(<Routes />)).toBeTruthy();
  });
});
