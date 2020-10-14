import { Route, Waypoint } from 'models';
import { slugify } from 'utils';

export const waypointToTrackpoint = (waypoint: Waypoint): string => {
  const { dateUpdated, marker } = waypoint;
  const coordinates: google.maps.LatLng | undefined | null = marker.getPosition();

  return coordinates
    ? `
      <trkpt lat="${coordinates.lat()}" lon="${coordinates.lng()}">
        <time>${dateUpdated.toISOString()}</time>
      </trkpt>
    `.trim()
    : '';
};

export const generateGPX = (route: Route, waypoints: Waypoint[]): string => {
  const trackpoints: string[] = waypoints.map((waypoint: Waypoint): string => waypointToTrackpoint(waypoint));

  return `
    <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
    <gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" creator="Oregon 400t" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">
      <metadata>
        <link href="http://komoot.matfin.dev">
          <text>Cross Country</text>
        </link>
        <time>${new Date().toISOString()}</time>
      </metadata>
      <trk>
        <name>${route.title}</name>
        <trkseg>
          ${trackpoints.join('\n')}
        </trkseg>
      </trk>
    </gpx>
  `;
};

export const downloadGPX = (route: Route | null, waypoints: Waypoint[]): void => {
  if (route && waypoints.length) {
    const element = document.createElement('a');
    const { title } = route;
    const gpx: string = generateGPX(route, waypoints).trim();

    element.setAttribute('href', `data:application/xml-gpx;charset=utf-8,${encodeURIComponent(gpx)}`);
    element.setAttribute('download', `${slugify(title)}.gpx`);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  }
};
