import React, { useEffect } from 'react';
import { Container } from './sidebar.css';

export interface Props {
  className?: string;
  children?: JSX.Element;
}

const Sidebar = ({ children, className }: Props): JSX.Element => {
  useEffect((): void => {
    console.log('Sidebar has been rendered!');
  }, []);

  return <Container className={className}>{children}</Container>;
};

export default Sidebar;
