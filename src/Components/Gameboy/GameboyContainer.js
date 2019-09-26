import React from "react";
import Gameboy from "./Gameboy";
import Game from "../Game/Game";

const GameboyContainer = props => {
  const [on, setOn] = React.useState(false);

  const buttonPress = key => {
    if (!window || !CustomEvent || !window.dispatchEvent) return;
    window.dispatchEvent(new CustomEvent("gb_keypress", { detail: { key } }));
  };

  const triggerSoundEvent = key => {
    if (!window || !CustomEvent || !window.dispatchEvent) return;
    window.dispatchEvent(new CustomEvent("gb_soundEvent", { detail: { key } }));
  };

  const initGame = () => {
    triggerSoundEvent("click");
    setOn(true);
  };

  const turnOn = initGame;

  const turnOff = () => {
    triggerSoundEvent("click");
    setOn(false);
  };

  return (
    <Gameboy
      buttonPress={buttonPress}
      turnOn={turnOn}
      turnOff={turnOff}
      on={on}
      triggerSoundEvent={triggerSoundEvent}
    >
      <Game on={on} triggerSoundEvent={triggerSoundEvent} />
    </Gameboy>
  );
};

export default GameboyContainer;
