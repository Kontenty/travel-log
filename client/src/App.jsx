import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { listLogEntires } from './API';
import LogEntryPopup from './components/LogEntryPopup';
import LogEntryForm from './components/LogEntryForm';

mapboxgl.accessToken =
  'pk.eyJ1Ijoia29udGVudHkiLCJhIjoiY2tmcGYweWtxMDRxMDJ3cnA1c2ZyaGYwaiJ9.d5CW9SPawU-ahL_1f7Lavg';

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);
  // const markerRef = useRef(new mapboxgl.Marker());
  /* const formPopupRef = useRef(
    new mapboxgl.Popup({
      offset: 2,
      className: 'form-popup',
      maxWidth: '400px',
    })
  ); */

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73, 40],
      zoom: 5,
      doubleClickZoom: false,
    });

    newMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    newMap.on('load', () => {
      newMap.resize();
      newMap.on('dblclick', (event) => {
        const formPopup = new mapboxgl.Popup({
          offset: 2,
          className: 'form-popup',
          maxWidth: '400px',
        });
        const removePopup = () => {
          formPopup.remove();
        };

        const { lngLat } = event;
        const popupNode = document.createElement('div');
        ReactDOM.render(
          <LogEntryForm lngLat={lngLat} removePopup={removePopup} />,
          popupNode
        );
        formPopup.setLngLat(lngLat).setDOMContent(popupNode).addTo(newMap);
      });

      setMap(newMap);
    });

    (async () => {
      const newLogEntries = await listLogEntires();
      console.log('set log entries');
      setLogEntries(newLogEntries);
    })();

    return () => newMap.remove();
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
