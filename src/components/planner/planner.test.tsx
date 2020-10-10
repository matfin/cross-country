import React from 'react';
import { renderWithRouter } from 'utils/testutils';
import Planner from './planner';

describe('Planner tests', (): void => {
  it('renders the component with children', (): void => {
    expect(renderWithRouter(<Planner />)).toBeTruthy();
  });
});
