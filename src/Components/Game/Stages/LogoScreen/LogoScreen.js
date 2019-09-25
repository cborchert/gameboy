import React from "react";
import "./LogoScreen.scss";

const LogoScreen = ({ next }) => {
  const logoTimer = React.useRef(null);
  React.useEffect(() => {
    logoTimer.current = setTimeout(next, 4300);
    return () => {
      logoTimer.current && clearTimeout(logoTimer.current);
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <div className="LogoScreen">Nintendo®</div>;
};

export default LogoScreen;
