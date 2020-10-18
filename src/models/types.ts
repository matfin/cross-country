import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from './interfaces';

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

export type JSXChildren = string | JSX.Element | JSX.Element[];

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export type AppDispatch = ThunkDispatch<AppState, unknown, Action<string>>;
