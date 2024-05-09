import { useEffect, useState } from 'react';
import './App.css';
import Map from './component/map';


const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  
  useEffect(() => {
    getLocation();
  }, []); // Changed from [getLocation] to [] to run only once

  return (
    <div className='App'>
      {(latitude !== null && longitude !== null) ? (
        <Map 
          latitude={latitude} 
          longitude={longitude} 
          zoomLevel={13} 
        />
      ) : (
        <p>Loading geolocation data...</p>
      )}
    </div>
  );
}

export default App;
