import React, { useState, useReducer, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import Albums from "./components/Albums";
import useProgress from "./components/useProgress";
import "./App.css";

let SLIDE_DURATION = 3000;

function Carousel(props) {
  return <section className="Carousel" {...props} />;
}

function Covers(props) {
  return <ul {...props} />;
}

function EachCover({ isCurrent, takeFocus, image, id, title, children }) {
  let ref = useRef();

  useEffect(() => {
    if (isCurrent && takeFocus) {
      ref.current.focus();
    }
  }, [isCurrent, takeFocus]);

  return (
    <li
      ref={ref}
      aria-hidden={!isCurrent}
      tabIndex="-1"
      aria-labelledby={id}
      className="Slide"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="SlideContent">
        <h2 id={id}>{title}</h2>
        {children}
      </div>
    </li>
  );
}

function SlideNav(props) {
  return <ul className="SlideNav" {...props} />;
}

function SlideNavItem({ isCurrent, ...props }) {
  return (
    <li className="SlideNavItem">
      <button {...props} aria-current={isCurrent}>
        <span />
      </button>
    </li>
  );
}

function Controls(props) {
  return <div className="Controls" {...props} />;
}

function IconButton(props) {
  return (
    <button {...props} className="IconButton" />
  );
}

function ProgressBar({ animate, time }) {
  let progress = useProgress(animate, time);

  return (
    <div className="ProgressBar">
      <div
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

function SpacerGif({ width }) {
  return (
    <div
      style={{ display: "inline-block", width }}
    />
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
