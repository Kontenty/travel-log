import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { listLogEntires } from './API';
import LogEntryPopup from './components/LogEntryPopup';

mapboxgl.accessToken =
  'pk.eyJ1Ijoia29udGVudHkiLCJhIjoiY2tmcGYweWtxMDRxMDJ3cnA1c2ZyaGYwaiJ9.d5CW9SPawU-ahL_1f7Lavg';

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);
  // const markerRef = useRef(new mapboxgl.Marker());
  // const popupRef = useRef(new mapboxgl.Popup({offset: 25}));

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
        const popupNode = document.createElement('div');
        ReactDOM.render(<LogEntryPopup entry={entry} />, popupNode);
        const popup = new mapboxgl.Popup({
          offset: 25,
        }).setDOMContent(popupNode);

        new mapboxgl.Marker()
          .setLngLat([entry.longitude, entry.latitude])
          .setPopup(popup)
          .addTo(map);
      });
    }
  }, [logEntries, map]);

  return (
    <div className="root">
      <div className="map-container" ref={mapContainerRef} />{' '}
    </div>
  );
}

export default App;
