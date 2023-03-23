// import React, { Component } from "react";
import { render } from "react-dom";
import React, {useState} from 'react';


// Import our components
import Board from './Components/Board.jsx';

function App () {
  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <Board/>
    </div>
  );
}

export default App;