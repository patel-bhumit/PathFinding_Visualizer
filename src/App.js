import { useEffect, useState } from 'react';
import './App.css';
import Map from './component/map';
import { BrowserView, MobileView } from 'react-device-detect';
import { grid } from 'ldrs';
import { transform } from 'framer-motion/dom';
import { motion } from 'framer-motion';


const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching geolocation data with a delay
    setTimeout(() => {
      getLocation();
      setIsLoading(false);
    }, 2000); // 2-second delay
  }, []);

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
  grid.register();

  return (
    <div className='App'>
      <BrowserView>
        {isLoading ? (
          <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} 
          className='h-screen bg-gray-900 content-center'>
            <l-grid
              size="100"
              speed="1.5" 
              color="white" 
            ></l-grid>
          </motion.div>
        ) : (
        <Map 
          latitude={latitude} 
          longitude={longitude} 
          zoomLevel={13} 
        />
        )}
    </BrowserView>
      <MobileView>
        <p style={{backgroundColor: 'white', color: 'black'}}>You can not access this website on mobile device.</p>
      </MobileView>
    </div>
  );
}

export default App;
