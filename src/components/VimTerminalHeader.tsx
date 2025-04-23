import React from "react";
import { Terminal, FileText, Wrench, Download, Send, Github, Linkedin, Rss, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const GITHUB_URL = "https://github.com/";
const LINKEDIN_URL = "https://linkedin.com/";
const SUBSTACK_URL = "https://substack.com/profile/";

interface VimTerminalHeaderProps {
  devMode: boolean;
  onDevModeToggle: () => void;
  onDownloadResume: () => void;
  activeSection: string;
  mode: "normal" | "insert";
}

const CustomToggle = ({ checked, onClick }: { checked: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label={checked ? "Switch to Recruiter Mode" : "Switch to Dev Mode"}
    className={cn(
      "inline-flex items-center w-10 h-5 rounded-full relative transition-colors duration-300",
      checked 
        ? "bg-[--terminal-bright-green]" 
        : "bg-terminal-muted"
    )}
  >
    <span
      className={cn(
        "absolute w-4 h-4 bg-white rounded-full transition-transform duration-300",
        checked 
          ? "translate-x-[22px]" 
          : "translate-x-0.5"
      )}
    />
  </button>
);

const showAppreciationToast = () => {
  toast({
    title: "❤️ Thank you!",
    description: "Glad you enjoyed my portfolio and design! Your appreciation means a lot.",
    duration: 3500,
  });
};

const VimTerminalHeader: React.FC<VimTerminalHeaderProps> = ({
  devMode,
  onDevModeToggle,
  onDownloadResume,
  activeSection,
  mode,
}) => (
  <div className="flex items-center justify-between px-4 pt-3 pb-1 border-b border-terminal-border bg-terminal-background">
    <div className="flex items-center gap-3">
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <Github size={22} style={{ color: "var(--terminal-bright-green)" }} className="transition-all" />
      </a>
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <Linkedin size={22} style={{ color: "var(--terminal-bright-green)" }} className="transition-all" />
      </a>
      <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" aria-label="Substack">
        <Rss size={22} style={{ color: "var(--terminal-bright-green)" }} className="transition-all" />
      </a>
      <button
        onClick={showAppreciationToast}
        className="ml-2 p-1 rounded hover:bg-terminal-border/70 transition focus-visible:outline-none focus:ring-2 focus:ring-terminal-accent"
        title="Show appreciation"
        aria-label="Love this portfolio"
        type="button"
      >
        <Heart size={21} className="text-terminal-bright-green hover:scale-105 transition-transform" />
      </button>
    </div>
    <div className="flex items-center space-x-2">
      <Terminal size={16} />
      <span className="font-bold text-xl text-terminal-bright-green select-none" style={{fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace"}}>
        ~/.profile
      </span>
    </div>
    <div className="flex items-center gap-3">
      {!devMode ? (
        <>
          <div className="flex items-center">
            <span className="mr-0.5 text-terminal-muted select-none text-base tracking-wide"
              style={{ fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace" }}>
              Recruiter Mode
            </span>
            <CustomToggle checked={devMode} onClick={onDevModeToggle} />
          </div>
          <button
            onClick={onDownloadResume}
            className="ml-3 flex items-center px-2 py-1 rounded-md border border-terminal-muted transition hover:bg-terminal-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent text-terminal-muted hover:text-terminal-bright-green"
            aria-label="Download Resume"
            type="button"
          >
            <Download size={19} />
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <span className="mr-0.5 text-terminal-muted select-none text-base tracking-wide"
              style={{ fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace" }}>
              Dev Mode
            </span>
            <CustomToggle checked={devMode} onClick={onDevModeToggle} />
          </div>
          {activeSection === 'blog' && (
            <FileText size={18} className="text-terminal-accent ml-1" />
          )}
          {activeSection === 'tools' && (
            <Wrench size={18} className="text-terminal-accent ml-1" />
          )}
          {activeSection === 'email' && (
            <Send size={18} className="text-terminal-accent ml-1" />
          )}
          <div className={cn(
            "vim-mode",
            mode === 'insert' && "vim-insert-mode"
          )}>
            {mode === 'normal' ? 'NORMAL' : 'INSERT'}
          </div>
        </>
      )}
    </div>
  </div>
);

export default VimTerminalHeader;
