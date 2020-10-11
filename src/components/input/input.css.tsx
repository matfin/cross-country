import styled from 'styled-components';
import { colours, fontSizes } from 'styles';

export const Container = styled.input`
  height: 3rem;
  margin-right: 1rem;
  border: none;
  border-bottom: 1px solid ${colours.primary};
  background: inherit;
  color: ${colours.primary};
  font-size: ${fontSizes.normal}rem;

  &:focus,
  &:hover {
    border-bottom: 2px solid ${colours.primary};
    outline: none;
  }
`;
