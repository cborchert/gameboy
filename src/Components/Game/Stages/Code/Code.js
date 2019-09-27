import React from "react";
import { decrypt } from "./vigenere";
import "./Code.scss";

const Code = ({ next, playerName, item, startLoop, stopAllMusic }) => {
  // item sound && music on load
  React.useEffect(() => {
    item();
    const listener = e => {
      if (e && e.detail && e.detail.key === "itemEnded") {
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

  // handle key presses
  React.useEffect(() => {
    const listener = e => {
      if (e && e.detail) {
        if (e.detail.key === "start") next();
      }
    };
    window.addEventListener("gb_keypress", listener);
    return () => window.removeEventListener("gb_keypress", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const coded = "334qCnFGJ8.SYB0n";
  return (
    <div className="Code">
      <div className="Code__background" />
      <div className="Code__Link" />
      <div className="Code__Text">
        At last, you got the SWITCH DOWNLOAD CODE! I wonder what it does...
        <br />
        <br />
        {decrypt(coded, playerName)}
      </div>
    </div>
  );
};

export default Code;
