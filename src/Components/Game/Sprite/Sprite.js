import React from "react";
import SpriteSheet from "./spritesheet.png";
import "./Sprite.scss";

const Sprite = ({
  frames = [[0, 0]],
  playing = true,
  fps = 3, // ~1 frame per second
  forceFrame = false,
  startFrame = 0,
  initTimeout = 0,
  size = 20,
  top,
  left,
  className = ""
}) => {
  const [onFrame, setOnFrame] = React.useState(
    (forceFrame === false ? startFrame : forceFrame) || 0
  );

  const previousTimeRef = React.useRef();
  const requestRef = React.useRef();

  const animate = time => {
    // if not playing, nothing changes
    if (!playing) {
      // if (!playing || !previousTimeRef.current) {
      // previousTimeRef.current = time;
      return;
    }

    // const delta = time - previousTimeRef.current;

    if (forceFrame !== false && onFrame !== forceFrame) {
      // if we need to force a specific frame, make sure the current frame equals the forced frame
      setOnFrame(forceFrame);
    } else {
      // else increase the frame by 1 (or return to zero)
      setOnFrame(prevFrame =>
        prevFrame + fps / 60 >= frames.length ? 0 : prevFrame + fps / 60
      );
    }

    // set up for the next
    // previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  // instantiate the animation
  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Set image styles
  const [frameCol, frameRow] = frames[Math.floor(onFrame)];
  const [offSetX, offSetY] = [frameCol * -20, frameRow * -20];
  const scale = size / 20;
  const imageStyles = {
    transform: `translateX(${offSetX}%) translateY(${offSetY}%)`
  };

  // set wrapper styles
  const wrapperStyles = {
    transform: `scale(${scale})`,
    top,
    left
  };

  return (
    <div className={`Sprite ${className}`} style={wrapperStyles}>
      <img src={SpriteSheet} alt="sprite" style={imageStyles} />
    </div>
  );
};

export default Sprite;
