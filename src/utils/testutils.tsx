import React from 'react';
import { Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import { render, RenderResult } from '@testing-library/react';
import { MapState, PlannerState, RoutesState } from 'models';
import { initialState as mapState } from 'components/map/reducer';
import { initialState as plannerState } from 'views/planner/reducer';
import { initialState as routesState } from 'views/routes/reducer';

interface CombinedReducerStates {
  mapState?: MapState;
  plannerState?: PlannerState;
  routesState?: RoutesState;
}

const defaultCombinedStates: CombinedReducerStates = {
  mapState,
  plannerState,
  routesState,
};

export const createMockStore = (state: CombinedReducerStates = defaultCombinedStates): Store => {
  const mockStore: MockStoreCreator = configureMockStore([thunkMiddleware]);

  return mockStore(state);
};

export const renderWithRouter = (children: JSX.Element): RenderResult =>
  render(<BrowserRouter>{children}</BrowserRouter>);
