import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import TerminalCursor from "./TerminalCursor";

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
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode]);

  useEffect(() => {
    setCursorPosition(command.length);
  }, [command]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (command.trim()) {
      const commandToSend = command.trim().startsWith(":")
        ? command.trim()
        : `:${command.trim()}`;
      onExecuteCommand(commandToSend);

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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      if (mode === "insert") {
        setMode("normal");
        onExecuteCommand("<esc>");
      }
      setCommand("");
      return;
    }

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
    <div className="terminal-footer p-2">
      <form 
        onSubmit={handleSubmit} 
        className="flex items-center font-mono relative"
      >
        <span
          className="terminal-prompt mr-1 text-white font-bold select-none text-lg"
          style={{
            fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          :
          <TerminalCursor 
            position={cursorPosition} 
            style={{ 
              position: 'absolute', 
              left: `${cursorPosition}ch`, 
              marginLeft: '2px' 
            }} 
          />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent flex-1 outline-none terminal-command caret-transparent text-base md:text-base text-white"
          placeholder={
            activeSection === "email" && mode === "insert"
              ? "Composing email... Press ESC to exit and send"
              : mode === "normal"
              ? "Type a command (help for options, email to compose)"
              : "Type text in insert mode, ESC to exit"
          }
          autoComplete="off"
          spellCheck="false"
          style={{
            fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
            minWidth: 0,
            marginLeft: "0.25rem",
          }}
        />
      </form>
    </div>
  );
};

export default VimCommandLine;
