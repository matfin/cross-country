import React from 'react';
import { Store } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { RoutesState } from 'models';
import { initialState } from 'components/routes/reducer';

interface CombinedReducerStates {
  routesState?: RoutesState;
}

const defaultCombinedStates: CombinedReducerStates = {
  routesState: initialState,
};

export const createMockStore = (state: CombinedReducerStates = defaultCombinedStates): Store => {
  const mockStore: MockStoreCreator = configureMockStore();

  return mockStore(state);
};

export const renderWithRouter = (children: JSX.Element): RenderResult =>
  render(<BrowserRouter>{children}</BrowserRouter>);
