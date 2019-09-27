import React from "react";
import "./NameSelect.scss";

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  " ",
  " ",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  " ",
  " ",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  " ",
  " ",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  " ",
  " ",
  " ",
  "v",
  "w",
  "x",
  "y",
  "z",
  " ",
  " "
];

const NameSelect = ({
  next,
  playerNumber,
  select,
  cursor,
  startLoop,
  stopAllMusic
}) => {
  const [name, setName] = React.useState("     ");
  const [selectedABCIndex, setSelectedABCIndex] = React.useState(0);
  const [selectedNameIndex, setSelectedNameIndex] = React.useState(0);

  // handle key presses
  React.useEffect(() => {
    const listener = e => {
      if (e && e.detail) {
        if (e.detail.key === "start") {
          select();
          next(name);
        }
        if (e.detail.key === "a") {
          select();
          setName(prevName => {
            const newName = prevName
              .split("")
              .map((c, i) =>
                i === selectedNameIndex ? letters[selectedABCIndex] : c || " "
              );
            return newName.join("");
          });
          if (selectedNameIndex < 4) {
            setSelectedNameIndex(previ => previ + 1);
          }
        }
        if (e.detail.key === "b") {
          cursor();
          if (selectedNameIndex > 0) {
            setSelectedNameIndex(previ => previ - 1);
          }
        }
        if (e.detail.key === "up") {
          cursor();
          setSelectedABCIndex(previ =>
            previ - 16 < 0 ? letters.length + previ - 16 : previ - 16
          );
        }
        if (e.detail.key === "down") {
          cursor();
          setSelectedABCIndex(previ =>
            previ + 16 >= letters.length
              ? previ + 16 - letters.length
              : previ + 16
          );
        }
        if (e.detail.key === "left") {
          cursor();
          setSelectedABCIndex(previ =>
            previ - 1 < 0 ? letters.length - 1 : previ - 1
          );
        }
        if (e.detail.key === "right") {
          cursor();
          setSelectedABCIndex(previ =>
            previ + 1 >= letters.length ? 0 : previ + 1
          );
        }
      }
    };
    window.addEventListener("gb_keypress", listener);
    return () => window.removeEventListener("gb_keypress", listener);
  }, [cursor, name, next, select, selectedABCIndex, selectedNameIndex]);

  // handle music
  React.useEffect(() => {
    stopAllMusic();
    startLoop();
    return () => stopAllMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="NameSelect">
      <div className="NameSelect__background" />
      <div className="NameSelect__name">
        <span className="NameSelect__playerNumber">{playerNumber}</span>
        {name.split("").map((char, i) => (
          <div
            key={`${char}-${i}`}
            className={`NameSelect__nameLetter ${
              i === selectedNameIndex ? "NameSelect__nameLetter--selected" : ""
            }`}
          >
            {char}
          </div>
        ))}
      </div>
      <div className="NameSelect__text">
        {letters.map((char, i) => (
          <span
            className={`NameSelect__letter ${
              i === selectedABCIndex ? "NameSelect__letter--selected" : ""
            }`}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NameSelect;
