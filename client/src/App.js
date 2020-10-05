import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { listLogEntires } from './API';

mapboxgl.accessToken =
  'pk.eyJ1Ijoia29udGVudHkiLCJhIjoiY2tmcGYweWtxMDRxMDJ3cnA1c2ZyaGYwaiJ9.d5CW9SPawU-ahL_1f7Lavg';

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73, 40],
      zoom: 8,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.on('load', () => {
      map.resize();
      console.log('set map');
      setMap(map);
    });

    (async () => {
      const newLogEntries = await listLogEntires();
      console.log('set log entries');
      setLogEntries(newLogEntries);
    })();

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (map) {
      logEntries.forEach((entry) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h2>${entry.title}</h2><img src=${entry.image} alt="popup-image" class="popup-img" />`
        );

        new mapboxgl.Marker()
          .setLngLat([entry.longitude, entry.latitude])
          .setPopup(popup)
          .addTo(map);
      });
    }
  }, [logEntries, map]);

  return (
    <div className="root">
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
}

export default App;
