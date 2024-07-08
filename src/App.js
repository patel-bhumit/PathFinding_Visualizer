import { useEffect, useState } from 'react';
import './App.css';
import Map from './component/map';
import { BrowserView, MobileView } from 'react-device-detect';


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
      <BrowserView>
        {(latitude !== null && longitude !== null) ? (
          <Map 
          latitude={latitude} 
          longitude={longitude} 
          zoomLevel={13} 
          />
        ) : (
          <p>Loading geolocation data...</p>
        )}
      </BrowserView>
      <MobileView>
        <p style={{backgroundColor: 'white', color: 'black'}}>You can not access this website on mobile device.</p>
      </MobileView>
    </div>
  );
}

export default App;
