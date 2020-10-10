import React from 'react';
import { render } from '@testing-library/react';
import Map from './map';

describe('Map tests', (): void => {
  it('should render the component', (): void => {
    expect(render(<Map />)).toBeTruthy();
  });
});
