import React from 'react'
import './App.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Traininglist from './components/Traininglist'

function App() {
   return (
    <div className="App">
      <AppBar position="static" color="dark">
        <Toolbar>
          <Typography variant="h6" color="dark">
            P.P.T - Pisanty Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <Traininglist />
    </div>
  );
}

export default App;
