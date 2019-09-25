import React from "react";
import LogoScreen from "./Stages/LogoScreen/LogoScreen";
import TitleScreen from "./Stages/TitleScreen/TitleScreen";
import FileSelect from "./Stages/FileSelect/FileSelect";
import NameSelect from "./Stages/NameSelect/NameSelect";
import Code from "./Stages/Code/Code";

const Game = ({ stage, setStage, on }) => {
  const [playerNumber, setPlayerNumber] = React.useState(1);
  const [playerName, setPlayerName] = React.useState("     ");

  if (!on) return null;

  switch (stage) {
    case 1:
      return (
        <LogoScreen
          next={() => {
            setStage(2);
          }}
        />
      );
    case 2:
      return (
        <TitleScreen
          next={() => {
            setStage(3);
          }}
        />
      );
    case 3:
      return (
        <FileSelect
          next={position => {
            setPlayerNumber(position);
            setStage(4);
          }}
        />
      );
    case 4:
      return (
        <NameSelect
          next={name => {
            setPlayerName(name);
            setStage(5);
          }}
          playerNumber={playerNumber}
        />
      );
    case 5:
      return (
        <Code
          next={() => {
            setPlayerName("     ");
            setPlayerNumber(1);
            setStage(2);
          }}
          playerName={playerName}
        />
      );
    default:
      return `💀 SOMETHING WENT WRONG! TRY TURNING IT OFF AND TURNING IT ON AGAIN?`;
  }
};

export default Game;
