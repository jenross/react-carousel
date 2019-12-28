import React, { useState, useReducer, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import Albums from "./components/Albums";
import useProgress from "./components/useProgress";
import "./App.css";

let SLIDE_DURATION = 3000;

function Carousel(props) {
  return <section className="Carousel" {...props} />;
}

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
