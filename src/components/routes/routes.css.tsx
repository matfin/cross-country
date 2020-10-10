import styled from 'styled-components';
import SidebarComponent from 'components/sidebar/sidebar';
import MapComponent from 'components/map/map';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'sidebar' 'map';
`;

export const Sidebar = styled(SidebarComponent)`
  grid-area: sidebar;
`;

export const Map = styled(MapComponent)`
  grid-area: map;
`;
