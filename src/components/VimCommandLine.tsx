
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';

interface VimCommandLineProps {
  onExecuteCommand: (command: string) => void;
  mode: 'normal' | 'insert';
  setMode: React.Dispatch<React.SetStateAction<'normal' | 'insert'>>;
  activeSection: string;
}

const VimCommandLine: React.FC<VimCommandLineProps> = ({ 
  onExecuteCommand, 
  mode,
  setMode,
  activeSection
}) => {
  const [command, setCommand] = useState('');
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
      onExecuteCommand(command);
      
      // Add to history if not already the last command
      if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== command) {
        setCommandHistory(prev => [...prev, command]);
      }
      
      setCommand('');
      setHistoryIndex(-1);
    }
  };

  // Handle keyboard navigation for command history
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // ESC key
    if (e.key === 'Escape') {
      if (mode === 'insert') {
        setMode('normal');
        onExecuteCommand('<esc>');
      }
      setCommand('');
      return;
    }
    
    // History navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } 
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } 
      else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  return (
    <div className="terminal-footer border-t border-terminal-border p-2">
      <form onSubmit={handleSubmit} className="flex items-center font-mono">
        <span className="terminal-prompt mr-2 text-terminal-bright-green font-bold select-none" style={{fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace"}}>
          $
        </span>
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={e => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent flex-1 outline-none terminal-command caret-transparent text-base md:text-base"
            placeholder={activeSection === 'email' && mode === 'normal' 
              ? "Type 'i' to compose an email" 
              : mode === 'normal' 
                ? "Type a command (:help for options)" 
                : "Type text in insert mode, <ESC> to exit"}
            autoComplete="off"
            spellCheck="false"
            style={{
              fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace"
            }}
          />
          {/* Custom green blinking caret */}
          <span
            className="terminal-caret animate-cursor-blink"
            style={{
              background: "#4AFF61",
              marginLeft: "-2px",
              width: "2px",
              height: "1.35em",
              position: "absolute",
              left: `calc(${command.length}ch + 8px)`,
              pointerEvents: "none"
            }}
          ></span>
        </div>
      </form>
    </div>
  );
};

export default VimCommandLine;
