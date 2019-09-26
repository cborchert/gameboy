import React from "react";
import "./LogoScreen.scss";

const LogoScreen = ({ next, chime }) => {
  const logoTimer = React.useRef(null);
  const chimeTimer = React.useRef(null);
  React.useEffect(() => {
    logoTimer.current = setTimeout(next, 4300);
    chimeTimer.current = setTimeout(chime, 3000);
    return () => {
      logoTimer.current && clearTimeout(logoTimer.current);
      chimeTimer.current && clearTimeout(chimeTimer.current);
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <div className="LogoScreen">Nintendo®</div>;
};

export default LogoScreen;
