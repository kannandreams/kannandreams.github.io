
import React, { useState, useEffect, useRef, KeyboardEvent } from "react";

interface VimCommandLineProps {
  onExecuteCommand: (command: string) => void;
  mode: "normal" | "insert";
  setMode: React.Dispatch<React.SetStateAction<"normal" | "insert">>;
  activeSection: string;
}

const VimCommandLine: React.FC<VimCommandLineProps> = ({
  onExecuteCommand,
  mode,
  setMode,
  activeSection,
}) => {
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on component mount and when mode changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode]);

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (command.trim()) {
      const commandToSend = command.trim().startsWith(":")
        ? command.trim()
        : `:${command.trim()}`;
      onExecuteCommand(commandToSend);

      // Add to history if not repeat
      if (
        commandHistory.length === 0 ||
        commandHistory[commandHistory.length - 1] !== commandToSend
      ) {
        setCommandHistory((prev) => [...prev, commandToSend]);
      }

      setCommand("");
      setHistoryIndex(-1);
    }
  };

  // Handle keyboard navigation for command history
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // ESC key
    if (e.key === "Escape") {
      if (mode === "insert") {
        setMode("normal");
        onExecuteCommand("<esc>");
      }
      setCommand("");
      return;
    }

    // History navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand("");
      }
    }
  };

  return (
    <div className="terminal-footer border-t border-terminal-border p-2">
      <form onSubmit={handleSubmit} className="flex items-center font-mono">
        {/* Updated: Replace $ with : prompt, color white */}
        <span
          className="terminal-prompt mr-2 text-white font-bold select-none text-lg"
          style={{
            fontFamily:
              "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
          }}
        >
          :
        </span>
        <div className="relative flex-1 flex items-center">
          {/* Cursor: bright green block, breathing animation, positioned next to colon */}
          <span
            className="terminal-caret block-caret-breath"
            style={{
              color: "var(--terminal-bright-green)",
              background: "none",
              position: "absolute",
              left: "calc(-1ch)", // Position next to colon, before input
              pointerEvents: "none",
              top: "50%",
              transform: "translateY(-55%)"
            }}
          >
            █
          </span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent flex-1 outline-none terminal-command caret-transparent text-base md:text-base text-white"
            placeholder={
              activeSection === "email" && mode === "normal"
                ? "Type i to compose an email"
                : mode === "normal"
                ? "Type a command (help for options)"
                : "Type text in insert mode, ESC to exit"
            }
            autoComplete="off"
            spellCheck="false"
            style={{
              fontFamily:
                "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default VimCommandLine;

