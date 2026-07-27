
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
  const inputRef = useRef<HTMLInputElement>(null);
  const fakeInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode]);

  const handleFakeInputClick = () => {
    inputRef.current?.focus();
  };

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

    // Handle 'i' key in email section to enter insert mode
    if (e.key === "i" && activeSection === "email" && mode === "normal" && command === "") {
      e.preventDefault();
      setMode("insert");
      onExecuteCommand("i");
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

  const placeholder =
    activeSection === "email" && mode === "insert"
      ? "Composing email... Press ESC to exit and send"
      : mode === "normal"
        ? "Type a command (help for options, email to compose)"
        : "Type text in insert mode, ESC to exit";

  return (
    <div className="terminal-footer p-2">
      <form
        onSubmit={handleSubmit}
        className="flex items-center font-mono relative"
        autoComplete="off"
      >
        <span
          className="terminal-prompt mr-1 font-bold select-none text-lg"
          style={{
            fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          :
        </span>
        <div
          className="relative flex items-center flex-1 cursor-text min-w-0"
          tabIndex={0}
          onClick={handleFakeInputClick}
          ref={fakeInputRef}
          style={{
            minWidth: 0,
            outline: "none",
          }}
        >
          <span
            className="whitespace-pre text-terminal-foreground text-base md:text-base min-w-0"
            style={{
              fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
              minWidth: 0,
              overflowWrap: "break-word",
              userSelect: "text"
            }}
          >
            {command || ""}
            <TerminalCursor />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none caret-transparent outline-none select-none bg-transparent"
            autoFocus
            autoComplete="off"
            spellCheck="false"
            aria-label="Vim style command line"
            style={{
              fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
              fontSize: "1rem",
              minWidth: 0,
              padding: 0,
              border: "none",
              background: "transparent",
            }}
            placeholder={placeholder}
            tabIndex={-1}
          />
          {command === "" && (
            <span className="absolute left-0 text-gray-500 select-none pointer-events-none text-base md:text-base pl-px" style={{
              fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
              opacity: 0.6,
              userSelect: "none",
            }}>{placeholder}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default VimCommandLine;
