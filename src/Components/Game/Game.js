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
import codeMusic from "../../audio/music-code-loop.mp3";
import selectMusic from "../../audio/music-select-loop.mp3";
import titleLoopMusic from "../../audio/music-title-loop.mp3";
import titleIntroMusic from "../../audio/music-title-intro.mp3";

const Game = ({ on, triggerSoundEvent }) => {
  const [playerNumber, setPlayerNumber] = React.useState(1);
  const [playerName, setPlayerName] = React.useState("     ");
  const [stage, setStage] = React.useState(0);

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
      src: [itemAudio],
      onend: () => triggerSoundEvent("itemEnded")
    })
  };
  const stopAllSoundEffects = () => {
    sounds.chime.stop();
    sounds.select.stop();
    sounds.item.stop();
    sounds.cursor.stop();
  };

  const music = {
    titleIntro: new Howl({
      src: [titleIntroMusic],
      onend: () => triggerSoundEvent("titleIntroEnded")
    }),
    titleLoop: new Howl({
      src: [titleLoopMusic],
      loop: true
    }),
    codeLoop: new Howl({
      src: [codeMusic],
      loop: true
    }),
    selectLoop: new Howl({
      src: [selectMusic],
      loop: true
    })
  };
  const stopAllMusic = () => {
    music.titleIntro.stop();
    music.titleLoop.stop();
    music.codeLoop.stop();
    music.selectLoop.stop();
  };
  React.useEffect(() => {
    const listener = e => {
      if (e && e.detail) {
        if (e.detail.key && sounds[e.detail.key]) {
          stopAllSoundEffects();
          sounds[e.detail.key].play();
        }
      }
    };
    window.addEventListener("gb_soundEvent", listener);
    return () => window.removeEventListener("gb_soundEvent", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reset game on on/off toggle
  React.useEffect(() => {
    setStage(on ? 1 : 0);
    if (!on) {
      stopAllMusic();
      stopAllSoundEffects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on]);

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
          startIntro={() => {
            music.titleIntro.play();
          }}
          startLoop={() => {
            music.titleLoop.play();
          }}
          stopAllMusic={stopAllMusic}
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
          startLoop={() => {
            music.selectLoop.play();
          }}
          stopAllMusic={stopAllMusic}
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
          startLoop={() => {
            music.selectLoop.play();
          }}
          stopAllMusic={stopAllMusic}
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
          startLoop={() => music.codeLoop.play()}
          stopAllMusic={stopAllMusic}
        />
      );
    default:
      return null;
  }
};

export default Game;
