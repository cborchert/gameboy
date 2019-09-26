import React from "react";
import { decrypt } from "./vigenere";
import "./Code.scss";

const Code = ({ next, playerName, item }) => {
  // item sound on load
  React.useEffect(() => {
    item();
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
  }, [next]);

  // TODO: Obviously, we won't include the key ot the original code anywhere in this text... or even commit it
  // const coded = encrypt("YOUR-SWITCH-DOWNLOAD-CODE", "demo ");
  const coded = "1S65/V0U7BKcP2VQP0OCbG0RD";
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
