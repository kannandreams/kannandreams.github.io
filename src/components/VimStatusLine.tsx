
import React from 'react';
import { cn } from "@/lib/utils";

interface VimStatusLineProps {
  mode: "normal" | "insert";
  activeSection: string;
  className?: string;
}

const VimStatusLine: React.FC<VimStatusLineProps> = ({
  mode,
  activeSection,
  className
}) => {
  const getFileName = () => {
    switch (activeSection) {
      case 'skills':
        return 'skills.md';
      case 'projects':
        return 'projects.md';
      case 'blog':
        return 'blog.md';
      case 'email':
        return 'compose.sh';
      case 'about':
        return 'about.md';
      default:
        return 'help.prompt';
    }
  };

  return (
    <div className={cn(
      "vim-status-line fixed bottom-0 left-0 right-0 h-6 bg-terminal-background border-t border-terminal-border flex items-center px-4 text-sm font-mono",
      className
    )}>
      <div className="flex-1 flex items-center space-x-4">
        <span className={cn(
          "px-2 py-0.5 text-black font-semibold",
          mode === 'normal' ? 'bg-terminal-accent' : 'bg-terminal-success'
        )}>
          {mode.toUpperCase()}
        </span>
        <span className="text-terminal-muted">
          {getFileName()}
        </span>
      </div>
      <div className="flex items-center space-x-4 text-terminal-muted">
        <span>utf-8</span>
        <span>[markdown]</span>
      </div>
    </div>
  );
};

export default VimStatusLine;
