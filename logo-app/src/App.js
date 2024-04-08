import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const logoRef = useRef(null);

  const handleMoveLogo = (event) => {
    const clickedX = event.clientX;
    const clickedY = event.clientY;

    setIsMoving(true);

    const moveLogo = () => {
      const deltaX = clickedX - logoPosition.x;
      const deltaY = clickedY - logoPosition.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > 1) {
        const angle = Math.atan2(deltaY, deltaX);
        const speed = 5;
        const newX = logoPosition.x + Math.cos(angle) * speed;
        const newY = logoPosition.y + Math.sin(angle) * speed;
        setLogoPosition({ x: newX, y: newY });
        requestAnimationFrame(moveLogo);
      } else {
        setIsMoving(false);
      }
    };

    moveLogo();
  };

  return (
    <div className="App" onClick={handleMoveLogo}>
      <Logo position={logoPosition} isMoving={isMoving} />
    </div>
  );
}

const Logo = ({ position, isMoving }) => {
  const logoStyle = {
    position: "absolute",
    left: position.x,
    top: position.y,
    transition: isMoving ? "none" : "all 0.5s ease",
  };

  return (
    <img
      src="https://www.wizard.financial/static/media/wizaart-img.56787174.gif"
      alt="Logo"
      style={{
        ...logoStyle,
        width: "100px",
        height: "100px",
      }}
    />
  );
};

export default App;
