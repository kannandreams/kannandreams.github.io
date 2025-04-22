
import React from "react";

/**
 * TerminalCursor
 * Renders a thin, blinking vertical line cursor with positioning next to the prompt (never moves)
 */
interface TerminalCursorProps {
  className?: string;
  style?: React.CSSProperties;
}

// Caret is always positioned "inline" after the prompt
const TerminalCursor: React.FC<TerminalCursorProps> = ({ className = "", style = {} }) => (
  <span
    className={`terminal-caret animate-cursor-blink ${className}`}
    style={{
      width: "2px",
      height: "1.25em",
      background: "var(--terminal-bright-green)",
      display: "inline-block",
      position: "static",
      marginLeft: "2px",
      marginRight: "2px",
      pointerEvents: "none",
      ...style,
    }}
    aria-hidden="true"
  />
);

export default TerminalCursor;

