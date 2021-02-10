import React from 'react';
import './App.css';
import {Board} from './components/Board/Board';

function App() {
  return (
    <div className="App">
      <Board height={25} width={25} startPoint={{x: 5, y: 15}}/>
    </div>
  );
}

export default App;
