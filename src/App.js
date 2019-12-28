import React, { useState, useReducer, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaSlideshare
} from "react-icons/fa";
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
  return <button {...props} className="IconButton" />;
}

function ProgressBar({ animate, time }) {
  let progress = useProgress(animate, time);

  return (
    <div className="ProgressBar">
      <div style={{ width: `${progress * 100}%` }} />
    </div>
  );
}

function SpacerGif({ width }) {
  return <div style={{ display: "inline-block", width }} />;
}

function App() {
  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "NEXT":
        case "PROGRESS":
          return {
            ...state,
            isPlaying: action.type === "PROGRESS",
            currentIndex: (state.currentIndex + 1) % Albums.length
          };
        case "PAUSE":
          return {
            ...state,
            isPlaying: false
          };
        case "PLAY":
          return {
            ...state,
            isPlaying: true
          };
        case "PREV":
          return {
            ...state,
            currentIndex:
              (state.currentIndex - 1 + Albums.length) % Albums.length,
            isPlaying: false
          };
        case "GOTO":
          return {
            ...state,
            takeFocus: true,
            currentIndex: action.index
          };
        case "UNSET_FOCUS":
          return {
            ...state,
            takeFocus: false
          };
        default:
          return state;
      }
    },
    {
      currentIndex: 0,
      isPlaying: false,
      takeFocus: false
    }
  );

  useEffect(() => {
    if (state.isPlaying) {
      let timeout = setTimeout(() => {
        dispatch({ type: "PROGRESS" });
      }, SLIDE_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [state.currentIndex, state.isPlaying]);

  useEffect(() => {
    if (state.takeFocus) {
      dispatch({ type: "UNSET_FOCUS" });
    }
  }, [state.takeFocus]);

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
