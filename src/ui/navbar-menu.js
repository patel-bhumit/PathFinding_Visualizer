import React, { useState } from "react";
import { motion } from "framer-motion";
import './navbar.css'

const Navbar = ({handleRun, firstNode, secondNode, clear}) => {
  const [active, setActive] = useState(null);
  const [showTrace, setShowTrace] = useState(false);

  const handleMouseEnter = (item) => {
    setActive(item);
  };

  const handleMouseLeave = () => {
    setActive(null);
  };

  const handleTrace = () => {
    showTrace == false ? setShowTrace(true) : setShowTrace(false);
  }


  return (
    <div className="navbar-container">
      <nav className="navbar" onMouseLeave={handleMouseLeave}>
        <NavItem label="Algorithm" active={active} setActive={handleMouseEnter}>
          <DropdownContent label="Algorithm" />
        </NavItem>
        <div className="nav-item">
          <button
            className={`nav-button ${firstNode !== null ? "green-circle" : "red-circle"}`}
          >
            Starting Point
          </button>
        </div>
        <div className="nav-item">
          <button
            className={`nav-button ${secondNode !== null ? "green-circle" : "red-circle"}`}
          >
            Ending Point
          </button>
        </div>
        <div className="nav-item">
          <button className="nav-button run-button" onClick={() => handleRun(showTrace)}>Run</button>
        </div>
        <div className="nav-item">
          <button className="nav-button clear-button" onClick={clear}>Clear</button>
        </div>
        <div className="nav-item">
          <button className={`nav-button ${showTrace == true ? "activeTrace" : "deactiveTrace"}`} onClick={handleTrace}>Trace</button>
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ label, active, setActive, children }) => {
  return (
    <div className="nav-item" onMouseEnter={() => setActive(label)}>
      <motion.p transition={{ duration: 0.3 }} className="nav-link">
        {label}
      </motion.p>
      {active === label && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="dropdown"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

const DropdownContent = ({ label }) => {
  let content;
  if (label === "Algorithm") {
    content = (
      <div className="dropdown-content">
        <a href="#">Djikstra's Algorithm</a>
        <a href="#"></a>
        <a href="#"></a>
        <a href="#"></a>
      </div>
    );
  }
  return content;
};

export default Navbar;
