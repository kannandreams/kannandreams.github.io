
import React from "react";

/**
 * TerminalCursor
 * Renders a bright green block caret with breathing animation,
 * positioned absolutely for terminal-style CLI use.
 * Customizable via className/position props if needed in the future.
 */
interface TerminalCursorProps {
  // Optional style/position overrides for flexibility
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Usage: Place next to CLI prompt or inside an input wrapper div.
 */
const TerminalCursor: React.FC<TerminalCursorProps> = ({ className = "", style = {} }) => (
  <span
    className={`terminal-caret block-caret-breath ${className}`}
    style={{
      color: "var(--terminal-bright-green)",
      background: "none",
      position: "absolute",
      left: "calc(-1ch)", // Position next to colon, before input
      pointerEvents: "none",
      top: "50%",
      transform: "translateY(-55%)",
      ...style,
    }}
    aria-hidden="true"
  >
    █
  </span>
);

export default TerminalCursor;
