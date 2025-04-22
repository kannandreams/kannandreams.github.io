
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (command.trim()) {
      // Don't add : prefix automatically anymore - handle bare commands directly
      onExecuteCommand(command.trim());

      if (
        commandHistory.length === 0 ||
        commandHistory[commandHistory.length - 1] !== command.trim()
      ) {
        setCommandHistory((prev) => [...prev, command.trim()]);
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
    <div className="terminal-footer border border-terminal-border p-2">
      <form onSubmit={handleSubmit} className="flex items-center font-mono">
        <span
          className="terminal-prompt mr-1 text-terminal-bright-green font-bold select-none text-lg"
          style={{
            fontFamily:
              "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
          }}
        >
          :
        </span>
        <div className="relative flex-1 flex items-center">
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
          <span
            className="terminal-caret animate-cursor-blink"
            style={{
              backgroundColor: "var(--terminal-bright-green)",
              width: "2px",
              display: "inline-block",
              height: "1.35em",
              marginLeft: "0px",
              marginTop: "2px",
              verticalAlign: "middle",
              borderRadius: "1px",
              pointerEvents: "none"
            }}
          >
          </span>
        </div>
      </form>
    </div>
  );
};

export default VimCommandLine;
