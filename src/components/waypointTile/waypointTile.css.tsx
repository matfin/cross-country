import styled from 'styled-components';
import { colours } from 'styles';
import { Bin } from 'components/icons';

export const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Note = styled.span`
  color: ${colours.secondary};
`;

export const DeleteButton = styled.button`
  cursor: pointer;
`;

export const DeleteIcon = styled(Bin)`
  fill: ${colours.iconPrimary};
  width: 2rem;
  height: 2rem;
`;
