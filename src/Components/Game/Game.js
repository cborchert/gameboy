import React from "react";
import { Howl } from "howler";

import LogoScreen from "./Stages/LogoScreen/LogoScreen";
import TitleScreen from "./Stages/TitleScreen/TitleScreen";
import FileSelect from "./Stages/FileSelect/FileSelect";
import NameSelect from "./Stages/NameSelect/NameSelect";
import Code from "./Stages/Code/Code";

import clickAudio from "../../audio/effect-switch.mp3";
import chimeAudio from "../../audio/effect-chime.mp3";
import selectAudio from "../../audio/effect-select.mp3";
import cursorAudio from "../../audio/effect-cursor.mp3";
import itemAudio from "../../audio/effect-item.mp3";

const Game = ({ on, triggerSoundEvent }) => {
  const [playerNumber, setPlayerNumber] = React.useState(1);
  const [playerName, setPlayerName] = React.useState("     ");
  const [stage, setStage] = React.useState(0);

  // reset game on on/off toggle
  React.useEffect(() => {
    setStage(on ? 1 : 0);
  }, [on]);

  // handle sounds
  const sounds = {
    click: new Howl({
      src: [clickAudio]
    }),
    chime: new Howl({
      src: [chimeAudio]
    }),
    select: new Howl({
      src: [selectAudio]
    }),
    cursor: new Howl({
      src: [cursorAudio]
    }),
    item: new Howl({
      src: [itemAudio]
    })
  };
  React.useEffect(() => {
    const listener = e => {
      if (e && e.detail) {
        if (e.detail.key && sounds[e.detail.key]) {
          sounds[e.detail.key].play();
        }
      }
    };
    window.addEventListener("gb_soundEvent", listener);
    return () => window.removeEventListener("gb_soundEvent", listener);
  });

  if (!on) return null;

  switch (stage) {
    case 1:
      return (
        <LogoScreen
          next={() => {
            setStage(2);
          }}
          chime={() => {
            triggerSoundEvent("chime");
          }}
        />
      );
    case 2:
      return (
        <TitleScreen
          next={() => {
            setStage(3);
          }}
          select={() => {
            triggerSoundEvent("select");
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
          select={() => {
            triggerSoundEvent("select");
          }}
          cursor={() => {
            triggerSoundEvent("cursor");
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
          select={() => {
            triggerSoundEvent("select");
          }}
          cursor={() => {
            triggerSoundEvent("cursor");
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
          item={() => {
            triggerSoundEvent("item");
          }}
          playerName={playerName}
        />
      );
    default:
      return null;
  }
};

export default Game;
