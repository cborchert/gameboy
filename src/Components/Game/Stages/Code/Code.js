import React from "react";
import { encrypt, decrypt } from "./vigenere";
import "./Code.scss";

const Code = ({ next, playerName }) => {
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
  const coded = encrypt("YOUR-SWITCH-DOWNLOAD-CODE", "demo ");
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
