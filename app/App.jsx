// import React, { Component } from "react";
import { render } from "react-dom";
import React, { useState, useEffect } from 'react';


// Import our components
import Board from './Components/Board.jsx';

function App() {
  const [port, setPort] = useState(null);

  useEffect(() => {
    connectToBackgroundScript();
  }, []);

  /**
   * Establishes long-lived connection with background script
   * Sets up listener for messages from the background script
   */
  const connectToBackgroundScript = () => {
    if (port) return;

    const bgPort = chrome.runtime.connect();

    bgPort.onMessage.addListener(handleMessageFromBackground);

    setPort(bgPort);
  };

  const sendMessageToBackground = (msg) => {
    console.log('dev tool sending message to background:', msg);
    if (port === null) {
      console.log('No port, exiting...');
      return;
    }

    port.postMessage({ message: msg });
  }

  /**
   * Invoked when a message is received from the background script
   * Parameters must be in the format: (message: any, sender: MessageSender, sendResponse: function) => boolean | undefined
   * See: https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
   */
  const handleMessageFromBackground = (msg, sender, sendResponse) => {
    console.log('dev tool received message from background:', msg.message);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <Board sendMsgToBG={sendMessageToBackground} />
    </div>
  );
}

export default App;