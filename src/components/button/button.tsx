import React from 'react';
import { JSXChildren } from 'models';
import { Container } from './button.css';

export interface Props {
  children?: JSXChildren;
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
