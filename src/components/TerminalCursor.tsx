
import React from "react";

/**
 * TerminalCursor
 * Renders a thin, blinking vertical line cursor that shifts with typing
 */
interface TerminalCursorProps {
  className?: string;
  style?: React.CSSProperties;
  position?: number;
}

const TerminalCursor: React.FC<TerminalCursorProps> = ({ 
  className = "", 
  style = {}, 
  position = 0 
}) => (
  <span
    className={`terminal-caret animate-cursor-blink ${className}`}
    style={{
      width: "2px",
      height: "1.25em",
      background: "var(--terminal-bright-green)",
      display: "inline-block",
      position: "absolute",
      left: `${position}ch`, // Dynamic positioning based on character count
      top: "50%",
      transform: "translateY(-55%)",
      pointerEvents: "none",
      transition: "left 0.05s ease",
      ...style,
    }}
    aria-hidden="true"
  />
);

export default TerminalCursor;
