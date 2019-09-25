import React from "react";
import TitleScreen from "../../images/title.png";
import Sparkle from "../../images/sparkle.png";
import "./Gameboy.scss";

// Intro
//https://www.youtube.com/watch?v=E0ErE4l1EKM
// Treasure get
//https://www.youtube.com/watch?v=rXWqFO75IZY
//https://www.youtube.com/watch?v=bZWTIbIKKn4
//GB hidef
//https://o.aolcdn.com/images/dims?quality=85&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fresize%3D2000%252C2000%252Cshrink%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2019-04%252Fb074a210-62e4-11e9-bf3d-5337ddc3269f%26client%3Da1acac3e1b3290917d92%26signature%3D6e437b6716eefc36dfbf680c4ede3bf623e3063f&client=amp-blogside-v2&signature=b7a594a04c63167038ae58d4acb4868afa34b004
//https://static.cnews.fr/sites/default/files/styles/image_640_360/public/nintendo_gameboy.jpg?itok=bl4SjE-k
//Enter Code
//https://www.youtube.com/watch?v=NYlMc638Yq0
const Gameboy = () => {
  const [on, setOn] = React.useState(false);
  const [stage, setStage] = React.useState(0);
  const timer = React.useRef(null);
  const initGame = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setOn(true);
    setStage(1);
    timer.current = setTimeout(() => setStage(2), 4300);
  };
  const turnOff = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setOn(false);
  };
  return (
    <div className={`Gameboy${on ? " Gameboy--on" : ""}`}>
      <div className="Gameboy__mask">
        <div className="Gameboy__mask__body" />
        <div className="Gameboy__sound">
          <div className="Gameboy__soundSlot" />
          <div className="Gameboy__soundSlot" />
          <div className="Gameboy__soundSlot" />
          <div className="Gameboy__soundSlot" />
          <div className="Gameboy__soundSlot" />
          <div className="Gameboy__soundSlot" />
        </div>
      </div>
      <div className="Gameboy__top">
        <div className="Gameboy__top__inner">
          <div className="Gameboy__topNotch Gameboy__topNotch--left" />
          <div className="Gameboy__top__center">
            <div className="Gameboy__ridges"></div>
            <div
              className="Gameboy__onOffLabel"
              onClick={() => {
                on ? turnOff() : initGame();
              }}
            >
              &#9664; Off &#9679; On &#9658;
            </div>
          </div>

          <div className="Gameboy__topNotch Gameboy__topNotch--right" />
        </div>
        <div
          className="Gameboy__onOffSwitch"
          onClick={() => {
            on ? turnOff() : initGame();
          }}
        />
      </div>
      <div className="Gameboy__body">
        <div className="Gameboy__screen">
          <div className="Gameboy__screenHeader">
            <div className="Gameboy__screenHeaderText">
              Dot Matrix With Stereo Sound
            </div>
          </div>
          <div className="Gameboy__screenInner">
            <div className="Gameboy__screenDeadPixels" />
            <div className="Gameboy__screenDeadPixels" />
            <div className="Gameboy__screenDeadPixels" />
            <div className="Gameboy__screenInner__content">
              <div
                className={`Gameboy__stageOne ${
                  stage === 1 ? "Gameboy__stageOne--active" : ""
                }`}
              >
                Nintendo®
              </div>
              <div
                className={`Gameboy__stageTwo ${
                  stage === 2 ? "Gameboy__stageTwo--active" : ""
                }`}
              >
                <div
                  className="sparkle sparkle--1"
                  style={{ backgroundImage: Sparkle }}
                />
                <div
                  className="sparkle sparkle--2"
                  style={{ backgroundImage: Sparkle }}
                />
                <div
                  className="sparkle sparkle--3"
                  style={{ backgroundImage: Sparkle }}
                />
                <div
                  className="sparkle sparkle--4"
                  style={{ backgroundImage: Sparkle }}
                />
                <img
                  src={TitleScreen}
                  className="stage__background"
                  alt="title screen"
                />
                <div className="Gameboy__stageTwo__pressStart">Press Start</div>
              </div>
            </div>
          </div>

          <div className="Gameboy__battery">
            <div className="Gameboy__batteryDot" />
            <div className="Gameboy__batteryText">Battery</div>
          </div>
        </div>
        <div className="Gameboy__logo">
          Nintendo <span className="Gameboy__logoGB">Game Boy</span>
          <span className="Gameboy__logoTM">TM</span>
        </div>
        <div className="Gameboy__controls">
          <div className="Gameboy__dpad">
            <div className="Gameboy__dpadButton Gameboy__dpadButton--up">
              <div className="Gameboy__dpad__bump"></div>
              <div className="Gameboy__dpad__bump"></div>
              <div className="Gameboy__dpad__bump"></div>
            </div>
            <div className="Gameboy__dpadButton Gameboy__dpadButton--down">
              <div className="Gameboy__dpad__bump"></div>
              <div className="Gameboy__dpad__bump"></div>
              <div className="Gameboy__dpad__bump"></div>
            </div>
            <div className="Gameboy__dpadButton Gameboy__dpadButton--left">
              <div className="Gameboy__dpad__bump"></div>
              <div className="Gameboy__dpad__bump"></div>
              <div className="Gameboy__dpad__bump"></div>
            </div>
            <div className="Gameboy__dpadButton Gameboy__dpadButton--right">
              <div className="Gameboy__dpad__bump"></div>
              <div className="Gameboy__dpad__bump"></div>
              <div className="Gameboy__dpad__bump"></div>
            </div>
            <div className="Gameboy__dpadButton Gameboy__dpadButton--center">
              <div className="Gameboy__dpad__divet" />
            </div>
          </div>
          <div className="Gameboy__buttons">
            <div className="Gameboy__button Gameboy__button--b">
              <div className="Gameboy__buttonLabel">B</div>
            </div>
            <div className="Gameboy__button Gameboy__button--a">
              <div className="Gameboy__buttonLabel">A</div>
            </div>
          </div>
        </div>
        <div className="Gameboy__options">
          <div className="Gameboy__option Gameboy__option--select">
            <div className="Gameboy__optionButton" />
            <div className="Gameboy__optionLabel">select</div>
          </div>
          <div className="Gameboy__option Gameboy__option--start">
            <div className="Gameboy__optionButton" />
            <div className="Gameboy__optionLabel">start</div>
          </div>
        </div>
        <div className="Gameboy__phones">
          phones<div className="Gameboy__ridges"></div>
        </div>
      </div>
    </div>
  );
};

export default Gameboy;
