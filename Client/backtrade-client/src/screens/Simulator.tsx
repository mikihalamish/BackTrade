import React, { useEffect, useState } from 'react';
import { IconButton, Dialog, DialogContent, DialogTitle } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SimulationBuilder from '../components/SimulationBuilder'; // make sure the path is correct

const Simulator: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleClickOpen()
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSimulationStart = () => {
    setOpen(false); // Close the dialog when simulation starts
  };


  return (
    <div style={{ position: 'relative' }}>
      <h1>Simulator</h1>
      {/* Simulator content goes here */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #00022c 0%, #000003 100%)',
            color: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px white solid'
          }
        }}
      >
        <DialogTitle>Simulation Builder</DialogTitle>
        <DialogContent>
          <SimulationBuilder onSimulationStart={handleSimulationStart} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Simulator;
