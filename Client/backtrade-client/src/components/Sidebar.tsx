import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaCogs, FaPlay, FaPlaystation, FaSignOutAlt, FaSimplybuilt, FaSmileBeam } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="Sidebar-container">
      <Link to="/dashboard" className="Sidebar-logo">
        <img className="Sidebar-logo-image" src={require('../assets/logo.png')} />
      </Link>
      <div className="Sidebar-header">Quick Access</div>
      <Link to="/dashboard" className="Sidebar-item">
        <FaChartLine /> Dashboard
      </Link>
      <Link to="/simulator" className="Sidebar-item">
        <FaPlay /> Simulator
      </Link>
      <Link to="/configuration" className="Sidebar-item">
        <FaCogs /> Configuration
      </Link>
      <div className="Sidebar-item">
        <FaSignOutAlt /> Log Out
      </div>
    </div>
  );
}

export default Sidebar;
