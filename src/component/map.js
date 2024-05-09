import L, { circleMarker, marker } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';

function Map({ latitude, longitude, zoomLevel }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const circleMarkerRef = useRef(null);

  const fetchDataFromOverpass = async (lat, lng) => {
    const query = `[out:json][timeout:25];
    nwr(around:5000,${lat},${lng})["highway"];
    out geom;`;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=`+encodeURIComponent(query)
    });

    console.log(response)

    const data = await response.json();

     // Process the data here
    data.elements.forEach(element => {
      if (element.geometry && Array.isArray(element.geometry)) {
        const geometry = element.geometry.map(coord => [coord.lat, coord.lon]);
      
        // Check if it's a polygon or a polyline
        const isPolygon = element.geometry.length > 2 && 
          geometry[0][0] === geometry[geometry.length - 1][0] && 
          geometry[0][1] === geometry[geometry.length - 1][1];
        
        if (isPolygon) {
          L.polygon(geometry, { color: 'red' }).addTo(mapInstance.current);
        } else {
          L.polyline(geometry, { color: 'blue' }).addTo(mapInstance.current);
        }
      } else {
        console.error('Invalid geometry data:', element.geometry);
      }
      });
  };

  useEffect(() => {
    if (latitude !== null && longitude !== null && !mapInstance.current) {
        mapInstance.current = L.map(mapRef.current).setView([latitude, longitude], zoomLevel);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(mapInstance.current);
        mapInstance.current.on("click", function(e){
            
            if (markerRef.current && circleMarkerRef.current) {
                markerRef.current.remove();
                circleMarkerRef.current.remove();
            }

            fetchDataFromOverpass(e.latlng.lat, e.latlng.lng);

            // Add a new marker at the clicked location
            const newCircleMarker = new L.Circle([e.latlng.lat, e.latlng.lng], {
                radius: 5000,
                opacity: .001,
            }).addTo(mapInstance.current);

            // Add a new marker at the clicked location
            const newMarker = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(mapInstance.current);

            

            // Update the state with the new marker
            markerRef.current = newMarker;
            circleMarkerRef.current = newCircleMarker
        })
        
    }

    // Cleanup function to remove the map instance when component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [latitude, longitude, zoomLevel]);

  return (
    <div ref={mapRef} style={{ height: '100vh' , backgroundColor: 'black'}} />
  );
}

export default Map;