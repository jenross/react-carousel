import React, { useState, useReducer, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaSlideshare
} from "react-icons/fa";
import Alert from "@reach/alert";
import VisuallyHidden from "@reach/visually-hidden";
import Albums from "./components/Albums";
import useProgress from "./components/useProgress";
import "./App.css";

let SLIDE_DURATION = 4000;

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
      <header className="App-header">
        <p>Favorite Albums 2019</p>
      </header>
      <Carousel aria-label="Jen Ross' favorite albums from 2019">
        <Covers>
          {Albums.map((image, index) => (
            <EachCover
              key={index}
              id={`image-${index}`}
              image={image.img}
              title={image.title}
              isCurrent={index === state.currentIndex}
              takeFocus={state.takeFocus}
              children={image.content}
            />
          ))}
        </Covers>

        <SlideNav>
          {Albums.map((album, index) => (
            <SlideNavItem
              key={index}
              isCurrent={index === state.currentIndex}
              aria-label={`Album ${index + 1}`}
              onClick={() => {
                dispatch({ type: "GOTO", index });
              }}
            />
          ))}
        </SlideNav>

        <Controls>
          {state.isPlaying ? (
            <IconButton
              aria-label="Pause"
              onClick={() => {
                dispatch({ type: "PAUSE" });
              }}
              children={<FaPause />}
            />
          ) : (
            <IconButton
              aria-label="Play"
              onClick={() => {
                dispatch({ type: "PLAY" });
              }}
              children={<FaPlay />}
            />
          )}
          <SpacerGif width="10px" />
          <IconButton
            aria-label="Previous Album"
            onClick={() => {
              dispatch({ type: "PREV" });
            }}
            children={<FaBackward />}
          />
          <IconButton
            aria-label="Next Album"
            onClick={() => {
              dispatch({ type: "NEXT" });
            }}
            children={<FaForward />}
          />
        </Controls>

        <ProgressBar
          key={state.currentIndex + state.isPlaying}
          time={SLIDE_DURATION}
          animate={state.isPlaying}
        />

        <VisuallyHidden>
          <Alert>
            Item {state.currentIndex + 1} of {Albums.length}
          </Alert>
        </VisuallyHidden>

      </Carousel>
    </div>
  );
}

export default App;
