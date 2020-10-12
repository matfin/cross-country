import styled from 'styled-components';
import { fontSizes, fontWeights } from 'styles';
import SidebarComponent from 'components/sidebar/sidebar';
import ButtonComponent from 'components/button/button';
import InputComponent from 'components/input/input';
import MapComponent from 'components/map/connectedMap';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'sidebar map';
`;

export const Sidebar = styled(SidebarComponent)`
  padding: 1rem;
  grid-area: sidebar;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3rem 1fr 5rem;
  grid-template-areas:
    'header'
    'route-list'
    'add-route';
`;

export const Heading = styled.h1`
  display: flex;
  align-items: center;
  font-size: ${fontSizes.heading}rem;
  font-weight: ${fontWeights.normal};
`;

export const RouteList = styled.ul`
  grid-area: route-list;
`;

export const AddRoute = styled.div`
  grid-area: add-route;
  display: flex;
  align-items: center;
`;

export const Input = styled(InputComponent)`
  flex: 3;
`;

export const Button = styled(ButtonComponent)`
  flex: 1;
`;

export const Map = styled(MapComponent)`
  grid-area: map;
`;
