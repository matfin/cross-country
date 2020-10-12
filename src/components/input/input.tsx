import React from 'react';
import { Container } from './input.css';

export interface Props {
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
}

const Input = ({
  className,
  disabled = false,
  onBlur,
  onChange,
  onFocus,
  placeholder = '',
  value,
}: Props): JSX.Element => (
  <Container
    className={className}
    data-testid="input"
    disabled={disabled}
    onBlur={onBlur}
    onChange={onChange}
    onFocus={onFocus}
    placeholder={placeholder}
    value={value}
  />
);

export default Input;
