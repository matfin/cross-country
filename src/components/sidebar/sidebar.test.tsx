import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './sidebar';

describe('Sidebar tests', (): void => {
  it('renders the component with children', (): void => {
    expect(
      render(
        <Sidebar>
          <p>Test</p>
        </Sidebar>,
      ),
    ).toBeTruthy();
  });
});
