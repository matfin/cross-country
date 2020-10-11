import styled from 'styled-components';
import SidebarComponent from 'components/sidebar/sidebar';
import ButtonComponent from 'components/button/button';
import InputComponent from 'components/input/input';
import MapComponent from 'components/map/map';

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
  grid-template-rows: 1fr 5rem;
  grid-template-areas:
    'route-list'
    'add-route';
`;

export const RouteList = styled.ul`
  grid-area: route-list;
`;

export const AddRoute = styled.div`
  grid-area: add-route;
  display: flex;
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
