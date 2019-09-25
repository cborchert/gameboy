import React from "react";
import Gameboy from "./Gameboy";
import Game from "../Game/Game";

const GameboyContainer = props => {
  const [on, setOn] = React.useState(false);
  const [stage, setStage] = React.useState(0);

  const initGame = () => {
    setOn(true);
    setStage(1);
  };

  const turnOn = initGame;

  const turnOff = () => {
    setOn(false);
    setStage(0);
  };

  const buttonPress = key => {
    if (!window || !CustomEvent || !window.dispatchEvent) return;
    window.dispatchEvent(new CustomEvent("gb_keypress", { detail: { key } }));
  };

  return (
    <Gameboy
      buttonPress={buttonPress}
      turnOn={turnOn}
      turnOff={turnOff}
      on={on}
    >
      <Game on={on} stage={stage} setStage={setStage} />
    </Gameboy>
  );
};

export default GameboyContainer;
