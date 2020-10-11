import React from 'react';
import { Container } from './button.css';

export interface Props {
  children?: any;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = ({ children, className, disabled = false, onClick }: Props): JSX.Element => (
  <Container data-testid="button" className={className} disabled={disabled} onClick={onClick}>
    {children}
  </Container>
);

export default Button;
