import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { listLogEntires } from './API';

mapboxgl.accessToken =
  'pk.eyJ1Ijoia29udGVudHkiLCJhIjoiY2tmcGYweWtxMDRxMDJ3cnA1c2ZyaGYwaiJ9.d5CW9SPawU-ahL_1f7Lavg';

function App() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntires();
      console.log(logEntries);
    })();

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-122.4, 37.7],
      zoom: 8,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.on('load', () => map.resize());

    return () => map.remove();
  }, []);

  return (
    <div className="root">
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
}

export default App;
