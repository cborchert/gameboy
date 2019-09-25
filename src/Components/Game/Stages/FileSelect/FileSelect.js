import React from "react";
import "./FileSelect.scss";

const FileSelect = ({ next }) => {
  const [position, setPosition] = React.useState(1);
  // handle key presses
  React.useEffect(() => {
    const listener = e => {
      if (e && e.detail) {
        if (e.detail.key === "start") next(position);
        if (e.detail.key === "a") next(position);
        if (e.detail.key === "up")
          setPosition(prevPosition =>
            prevPosition - 1 < 1 ? 3 : prevPosition - 1
          );
        if (e.detail.key === "down")
          setPosition(prevPosition =>
            prevPosition + 1 > 3 ? 1 : prevPosition + 1
          );
      }
    };
    window.addEventListener("gb_keypress", listener);
    return () => window.removeEventListener("gb_keypress", listener);
  }, [next, position]);

  return (
    <div className="FileSelect">
      <div className="FileSelect__background" />
      <div
        className={`FileSelect__cursor FileSelect__cursor--position-${position}`}
      />
    </div>
  );
};

export default FileSelect;
