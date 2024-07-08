import L, { latLng } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import createGraph from './createGraph';
import dijkstra from '../algo/djikstraAlgorithm';
import Nav from '../ui/navbar-menu';

function Map({ latitude, longitude, zoomLevel }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const SecondMarkerRef = useRef(null);
  const circleMarkerRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const dataRef = useRef(null);
  const [firstNode, setFirstNode] = useState(null);
  const [secondNode, setSecondNode] = useState(null);
  const [graph, setGraph] = useState(null);
  const [coordsGraph, setCoordsGraph] = useState(null);
  const polylineGroup = useRef(L.layerGroup());
  const fetchControllerRef = useRef();
  const drawControllerRef = useRef();
  const dijkstraController = useRef();

  // function:    fetchDataFromOverpass
  // Discription: fetch and returns the data within radius
  //              radius
  const fetchDataFromOverpass = async (lat, lng) => {

    const fetchController = new AbortController();
    fetchControllerRef.current = fetchController;
    const query = `[out:json][timeout:25];
    nwr(around:3000,${lat},${lng})["highway"];
    out geom;`;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=`+encodeURIComponent(query)
    });

    
    const responseJson = await response.json();
    dataRef.current  = responseJson;

    setGraph(createGraph(responseJson)[0]);
    setCoordsGraph(createGraph(responseJson)[1]);

    // find and display the nearestNode
    if(responseJson && Array.isArray(responseJson.elements)){
      setFirstNode(findNearestValue(lat, lng, responseJson));
    }

  };

  // function:    findNearestValue
  // Discription: finds the nearest node from given position
  //              
  const findNearestValue = (lat, lng, json) => {
    let nearestNode = null;
    let currentPoint = latLng(lat, lng);
    let lastDistance = 3000
  
      if (Array.isArray(json.elements)) {
        const nodes = json.elements.filter(elem => {
          return elem.type === "way"
        });

        nodes.forEach(elem => {
          let nodePoint = latLng(elem.bounds.minlat, elem.bounds.minlon);
          let distance = nodePoint.distanceTo(currentPoint)
            if(distance < lastDistance){
              nearestNode = elem;
              lastDistance = distance;
            }
        });
      }


    return nearestNode.nodes[0];
  }

  const handleFindPath = async (showTrace) => {
    if (firstNode && secondNode && graph && coordsGraph) {
    const Controller = new AbortController();
    dijkstraController.current = Controller;
      const result = await dijkstra(graph, coordsGraph, firstNode, secondNode, drawPath, Controller.signal, showTrace);
      for(let i = 0; i < result.path.length - 1; i++){
        let fromNode = coordsGraph.get(result.path[i]);
        let toNode = coordsGraph.get(result.path[i+1]);
        drawPath(fromNode, toNode, "blue");
      }
    }
  }

  // function:    drawPath
  // description: draws the polyline from given details
  const drawPath = async (fromNode, toNode, color) => {
    const controller = new AbortController();
    drawControllerRef.current = controller;
    if (fromNode && toNode) {
      const polyline = L.polyline([fromNode, toNode], { color: color });
      polyline.addTo(polylineGroup.current); // Add polyline to LayerGroup
      polylineGroup.current.addTo(mapInstance.current); // Ensure LayerGroup is added to map
    }
  }

  const clearMap = () => {
    if(fetchControllerRef){
      fetchControllerRef.current.abort(); 
    }
    if(drawControllerRef){
      drawControllerRef.current.abort();
    }
    if(dijkstraController){
      dijkstraController.current.abort();
    }
    if (polylineGroup.current) {
      polylineGroup.current.clearLayers(); // Clear all layers in the LayerGroup
    }
    if (polylineGroup.current) {
      polylineGroup.current.clearLayers();
    }
    if (markerRef.current) {
      markerRef.current.remove();
    }
    if (circleMarkerRef.current) {
      circleMarkerRef.current.remove();
    }
    if (SecondMarkerRef.current) {
      SecondMarkerRef.current.remove();
    }
    if(firstNode){
      setFirstNode(null);
    }
    if(secondNode){
      setSecondNode(null);
    }
    if(graph){
      setGraph(null);
    }
    if(coordsGraph){
      setCoordsGraph(null);
    }
    if(dataRef.current){
      dataRef.current = null;
    }
    setClicked(false);
  }

  useEffect( () => {
    if(markerRef.current){
      setClicked(true);
    }
  }, [markerRef.current]);


  useEffect( () => {
    if (latitude !== null && longitude !== null && !mapInstance.current) {
        mapInstance.current = L.map(mapRef.current).setView([latitude, longitude], zoomLevel);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(mapInstance.current);
        setClicked(false);
        mapInstance.current.on("click", function(e){
          setGraph(null);
          setCoordsGraph(null);
          if (markerRef.current && circleMarkerRef.current) {
                setFirstNode(null);
                setSecondNode(null);
                setClicked(false);
                if(SecondMarkerRef.current){
                  SecondMarkerRef.current.remove();
                }
                circleMarkerRef.current.remove();
              }
              
            fetchDataFromOverpass(e.latlng.lat, e.latlng.lng);

            // Add a new marker at the clicked location
            const newCircleMarker = new L.Circle([e.latlng.lat, e.latlng.lng], {
                radius: 3000,
                opacity: .001,
            }).addTo(mapInstance.current);

            // Add a new marker at the clicked location
            const newMarker = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(mapInstance.current);

            // Update the state with the new marker
            markerRef.current = newMarker;
            circleMarkerRef.current = newCircleMarker;
        })
    }
  }, [latitude, longitude, zoomLevel]);

  useEffect(() => {
    if (clicked) {
        const contextMenuHandler = function (e) {
            const clickPoint = L.latLng(e.latlng.lat, e.latlng.lng);
            const markerPoint = markerRef.current.getLatLng();
            const distance = clickPoint.distanceTo(markerPoint);
            if(SecondMarkerRef.current){
              SecondMarkerRef.current.remove();
            }
            if (distance <= 3000) {
                // Add a new marker at the clicked location
                const SecondMarker = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(mapInstance.current);
                SecondMarkerRef.current = SecondMarker;
                const data = dataRef.current; // use the data from reference
                setSecondNode(findNearestValue(e.latlng.lat, e.latlng.lng, data));
                    
                console.log("within the circle!!");
            } else {
                console.log("Not within the circle!!");
            }
        };

        mapInstance.current.on("contextmenu", contextMenuHandler);

        // Cleanup function to remove the context menu event listener when component unmounts
        return () => {
          mapInstance.current.off("contextmenu", contextMenuHandler);
        };
    }
}, [clicked]);

  

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Nav handleRun = {handleFindPath} firstNode={firstNode} secondNode= {secondNode} clear = {clearMap}/>
      </div>
      <div ref={mapRef} style={{ height: '100vh', backgroundColor: 'black', zIndex: 1, position: 'static'}} />
    </div>  
  );
}

export default Map;