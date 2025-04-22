
import React from "react";

/**
 * TerminalCursor
 * Renders a thin, blinking vertical line cursor right after the colon prompt (never moves)
 */
interface TerminalCursorProps {
  className?: string;
  style?: React.CSSProperties;
}

const TerminalCursor: React.FC<TerminalCursorProps> = ({
  className = "",
  style = {},
}) => (
  <span
    className={`terminal-caret animate-cursor-blink ${className}`}
    style={{
      width: "2px",
      height: "1.25em",
      background: "var(--terminal-bright-green)",
      display: "inline-block",
      position: "relative", // stays inline after the colon
      marginLeft: "6px", // small gap after colon
      verticalAlign: "middle",
      pointerEvents: "none",
      ...style,
    }}
    aria-hidden="true"
  />
);

export default TerminalCursor;
