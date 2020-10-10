import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

describe('App tests', (): void => {
  it('should render the component', (): void => {
    expect(render(<App />)).toBeTruthy();
  });
});
