import styled from 'styled-components';
import { fontSizes, fontWeights } from 'styles';
import ButtonComponent from 'components/button/button';
import SidebarComponent from 'components/sidebar/sidebar';
import MapComponent from 'components/map/connectedMap';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'map';
`;

export const Sidebar = styled(SidebarComponent)`
  z-index: 1;
  position: fixed;
  top: 4rem;
  left: 1rem;
  bottom: 4rem;
  width: 16rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4rem auto 1fr 3rem;
  grid-template-areas:
    'header'
    'message'
    'waypoints'
    'save';
  backdrop-filter: blur(0.25rem);
`;

export const Heading = styled.h1`
  grid-area: header;
  display: flex;
  align-items: center;
  font-size: ${fontSizes.heading}rem;
  font-weight: ${fontWeights.normal};
`;

export const Message = styled.p`
  grid-area: message;
  font-size: ${fontSizes.normal}rem;
  font-weight: ${fontWeights.normal};
`;

export const WaypointList = styled.ul`
  grid-area: waypoints;
`;

export const Map = styled(MapComponent)`
  grid-area: map;
`;

export const Button = styled(ButtonComponent)`
  grid-area: save;
  height: 3rem;
`;
