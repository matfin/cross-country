import React from 'react';
import { Container } from './sidebar.css';

export interface Props {
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

const Sidebar = ({ children, className }: Props): JSX.Element => {
  return <Container className={className}>{children}</Container>;
};

export default Sidebar;
