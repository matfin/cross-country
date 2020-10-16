import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { MapState, PlannerState, RoutesState } from './interfaces';

export type Colours = {
  primary: string;
  backdropPrimary: string;
  secondary: string;
  buttonPrimary: string;
  buttonHover: string;
  buttonDisabled: string;
  iconPrimary: string;
  mapLine: string;
};

export type FontSizes = {
  heading: number;
  normal: number;
};

export type FontWeights = {
  bold: number;
  normal: number;
  light: number;
};

export type JSXChildren = JSX.Element | JSX.Element[];

export type AppStates = MapState | PlannerState | RoutesState;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStates, unknown, Action<string>>;
