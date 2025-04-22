
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';

interface VimCommandLineProps {
  onExecuteCommand: (command: string) => void;
  mode: 'normal' | 'insert';
  setMode: React.Dispatch<React.SetStateAction<'normal' | 'insert'>>;
}

const VimCommandLine: React.FC<VimCommandLineProps> = ({ 
  onExecuteCommand, 
  mode,
  setMode
}) => {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="terminal-prompt mr-2">{mode === 'normal' ? ':' : '> '}</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={e => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent flex-1 outline-none terminal-command"
          placeholder={mode === 'normal' ? "Type a command (:help for options)" : "Type text in insert mode, <ESC> to exit"}
          autoComplete="off"
          spellCheck="false"
        />
        <div className="terminal-caret"></div>
      </form>
    </div>
  );
};

export default VimCommandLine;
