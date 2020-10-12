import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RoutesState } from './interfaces';

export type Colours = {
  primary: string;
  secondary: string;
  buttonPrimary: string;
  buttonHover: string;
  buttonDisabled: string;
  iconPrimary: string;
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

export type AppState = RoutesState;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
