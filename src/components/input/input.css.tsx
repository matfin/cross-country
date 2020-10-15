import styled from 'styled-components';
import { colours, fontSizes } from 'styles';

export const Container = styled.input`
  height: 2rem;
  border: none;
  border-bottom: 1px solid ${colours.secondary};
  background: inherit;
  color: ${colours.secondary};
  font-size: ${fontSizes.normal}rem;

  &:focus,
  &:hover {
    border-bottom: 2px solid ${colours.secondary};
    outline: none;
  }
`;
