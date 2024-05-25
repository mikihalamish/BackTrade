import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './screens/Dashboard';
import Configuration from './screens/Configuration';
import Simulator from './screens/Simulator';
import './Main.css';

const Main: React.FC = () => {
  return (
    <Router>
      <div className="App-container">
        <Sidebar />
        <div className="Main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Main;
