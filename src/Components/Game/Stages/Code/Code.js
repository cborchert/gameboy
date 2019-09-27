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

  let message = "";
  if (playerName.toLowerCase() === "david") {
    message = <>Don't put in your real name... Try again</>;
  } else if (playerName.toLowerCase() === "axel") {
    message = <>Cou cou, Axel.</>;
  } else if (playerName.toLowerCase() === "kevin") {
    message = <>Casse-toi, tu pues, et marche à l'ombre !</>;
  } else if (playerName.toLowerCase() === "zelda") {
    message = <>Ha ha ha, very funny...</>;
  } else if (playerName.toLowerCase() === "link") {
    message = <>Soooo original</>;
  } else {
    message = (
      <>
        {" "}
        At last, you got the SWITCH DOWNLOAD CODE! I wonder what it does...
        <br />
        <br />
        {decrypt(coded, playerName)}
      </>
    );
  }
  return (
    <div className="Code">
      <div className="Code__background" />
      <div className="Code__Link" />
      <div className="Code__Text">{message}</div>
    </div>
  );
};

export default Code;
