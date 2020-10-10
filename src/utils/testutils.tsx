import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';

export const renderWithRouter = (children: JSX.Element): RenderResult =>
  render(<BrowserRouter>{children}</BrowserRouter>);
