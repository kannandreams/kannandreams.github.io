
import React from "react";

interface TerminalCursorProps {
  className?: string;
  style?: React.CSSProperties;
}

const TerminalCursor: React.FC<TerminalCursorProps> = ({ className = "", style = {} }) => (
  <span
    className={`terminal-caret animate-cursor-blink ${className}`}
    style={{
      position: "absolute",
      left: "calc(-0.25ch)",
      top: "50%",
      transform: "translateY(-55%)",
      pointerEvents: "none",
      ...style,
    }}
    aria-hidden="true"
  />
);

export default TerminalCursor;
