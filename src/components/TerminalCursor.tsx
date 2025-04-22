
import React from "react";

/**
 * TerminalCursor
 * Renders a thin, blinking vertical line cursor with positioning next to the prompt
 */
interface TerminalCursorProps {
  className?: string;
  style?: React.CSSProperties;
}

const TerminalCursor: React.FC<TerminalCursorProps> = ({ className = "", style = {} }) => (
  <span
    className={`terminal-caret animate-cursor-blink ${className}`}
    style={{
      width: "2px", // Make cursor thin
      height: "1.35em", // Standard text height
      background: "var(--terminal-bright-green)", // Keep bright green
      position: "absolute",
      left: "calc(-0.25ch)", // Bring closer to colon
      top: "50%",
      transform: "translateY(-55%)",
      pointerEvents: "none",
      ...style,
    }}
    aria-hidden="true"
  />
);

export default TerminalCursor;
