import React from "react";
// import Sprite from "../../Sprite/Sprite";
import "./TitleScreen.scss";

const TitleScreen = ({ next, select, stopAllMusic, startLoop, startIntro }) => {
  // handle key presses
  React.useEffect(() => {
    const listener = e => {
      if (e && e.detail) {
        if (e.detail.key === "start") {
          select();
          next();
        }
      }
    };
    window.addEventListener("gb_keypress", listener);
    return () => window.removeEventListener("gb_keypress", listener);
  });

  // handle music
  React.useEffect(() => {
    stopAllMusic();
    startIntro();
    const listener = e => {
      if (e && e.detail && e.detail.key === "titleIntroEnded") {
        startLoop();
      }
    };
    window.addEventListener("gb_soundEvent", listener);
    return () => {
      stopAllMusic();
      window.removeEventListener("gb_soundEvent", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="TitleScreen">
      <div className="TitleScreen__sparkle TitleScreen__sparkle--1" />
      <div className="TitleScreen__sparkle TitleScreen__sparkle--2" />
      <div className="TitleScreen__sparkle TitleScreen__sparkle--3" />
      <div className="TitleScreen__sparkle TitleScreen__sparkle--4" />
      <div className="TitleScreen__background" />
      <div className="TitleScreen__pressStart">Press Start</div>
    </div>
  );
};

export default TitleScreen;
