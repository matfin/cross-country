import styled, { css } from 'styled-components';
import { colours, fontSizes } from 'styles';

interface ContainerProps {
  disabled: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  background: ${colours.buttonPrimary};
  color: ${colours.secondary};
  border-radius: 0.5rem;
  font-size: ${fontSizes.normal}rem;
  cursor: pointer;

  &:hover {
    background: ${colours.buttonHover};
  }

  ${({ disabled }: ContainerProps) =>
    disabled &&
    css`
      color: ${colours.buttonDisabled};
    `}
`;
