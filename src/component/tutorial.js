import React, { useState } from 'react';
import gif1 from '../asset/gif/1.gif';
import gif2 from '../asset/gif/2.gif';
import gif3 from '../asset/gif/3.gif';
import gif4 from '../asset/gif/4.gif';
import green1 from '../asset/img/green1.png';
import green2 from '../asset/img/green2.png';
import green3 from '../asset/img/green3.png';
import red1 from '../asset/img/red1.png';
import red2 from '../asset/img/red2.png';

function Tutorial() {
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(true);

  const tutorialContent = [
    {
      title: "Welcome to the Tutorial",
      description: (
        <span>
        When prompted, please allow location access to the application. This is necessary for the map to function properly.
        Once the map loads, click on the map to set your starting point. You will see a marker appear at the clicked location.
        Wait for the starting point in the navigation bar to turn green: initially, it will appear in red 
        <img src={red1} alt="Red Button" className="inline-block mx-1 w-auto h-10" />. 
        Please wait until it turns green 
        <img src={green1} alt="Green Button" className="inline-block mx-1 w-auto h-10" />, 
        indicating that the starting point has been successfully set.
      </span>
      ),
      gif: gif1
    },
    {
      title: "Step 2: Understanding the Basics",
      description: (
        <span>
        In this step, you will set the ending point for the path you want to find.
        <br />
        1. <strong>Left Click on the Map</strong>: Click on the map at the location where you want to set the ending point. You will see a marker appear at the clicked location.
        <br />
        2. <strong>Wait for the Marker to Turn Red</strong>: The marker will initially appear in green. Please wait until the ending point button in the navigation bar turns red 
        <img src={red2} alt="Red Button" className="inline-block mx-1 w-auto h-10" />, 
        indicating that the ending point has been successfully set.
      </span>
      ),
      gif: gif2
    },
    {
      title: "Step 3: Advanced Techniques",
      description: (
        <span>
          In this step, you will run the pathfinding algorithm to see the trace route if the trace option is active.
          <br />
          1. <strong>Hit the Run Button</strong>: Click the "Run" button in the navigation bar.
          <br />
          2. <strong>Check Trace Option</strong>: If the trace option is active 
          <img src={green3} alt="Green Button" className="inline-block mx-1 w-auto h-10" />, 
          you will see the trace route of the pathfinding process on the map.
        </span>
      ),
      gif: gif3
    },
    {
      title: "Step 4: Final Steps",
      description: "You're almost done! In last, this is how it works without trace.",
      gif: gif4
    }
  ];

  const nextPage = () => setPage((prevPage) => (prevPage + 1) % tutorialContent.length);
  const prevPage = () => setPage((prevPage) => (prevPage - 1 + tutorialContent.length) % tutorialContent.length);

  return (
    <div id="default-modal" tabIndex="-1" aria-hidden="true" className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex ${showModal ? '' : 'hidden'}`}>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {tutorialContent[page].title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setShowModal(false)}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed m-5  text-gray-500 dark:text-gray-400">
              {tutorialContent[page].description}
            </p>
            <div className="flex justify-center">
              <img src={tutorialContent[page].gif} alt={`Tutorial step ${page + 1}`} className="rounded-lg shadow-lg"/>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button onClick={prevPage} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Previous
            </button>
            <button onClick={nextPage} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
