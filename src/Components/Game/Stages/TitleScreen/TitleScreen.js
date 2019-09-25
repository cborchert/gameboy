import React from "react";
// import Sprite from "../../Sprite/Sprite";
import "./TitleScreen.scss";

const TitleScreen = ({ next }) => {
  // handle key presses
  React.useEffect(() => {
    const listener = e => {
      if (e && e.detail) {
        if (e.detail.key === "start") next();
      }
    };
    window.addEventListener("gb_keypress", listener);
    return () => window.removeEventListener("gb_keypress", listener);
  });
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
