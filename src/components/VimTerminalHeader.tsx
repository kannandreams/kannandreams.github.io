
import React from "react";
import { Terminal, Github, Linkedin, Rss, Heart, ChevronDown, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

const GITHUB_URL = "https://github.com/kannandreams";
const LINKEDIN_URL = "https://www.linkedin.com/in/kannandreams/";
const SUBSTACK_URL = "https://engineersmeetai.substack.com/";

interface VimTerminalHeaderProps {
  activeSection: string;
  mode: "normal" | "insert";
  theme: "duskshell" | "dawnshell";
  onThemeChange: (theme: "duskshell" | "dawnshell") => void;
}

const showAppreciationToast = () => {
  if (window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Engagement',
      event_label: 'Heart Button',
      value: 1
    });
  }
  
  toast({
    title: "❤️ Thank you!",
    description: "Glad you enjoyed my portfolio and design! Your appreciation means a lot.",
    duration: 3500,
  });
};

const VimTerminalHeader: React.FC<VimTerminalHeaderProps> = ({
  activeSection,
  mode,
  theme,
  onThemeChange,
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-1.5 px-2 py-1 rounded border border-terminal-border/40 text-terminal-foreground hover:border-terminal-muted/60 transition-colors"
            aria-label="Select theme"
            type="button"
          >
            <Palette size={14} />
            <span className="text-xs">{theme === "duskshell" ? "dusk" : "dawn"}</span>
            <ChevronDown size={12} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[999] min-w-[140px]">
          <DropdownMenuItem
            onClick={() => onThemeChange("duskshell")}
            className={cn("cursor-pointer", theme === "duskshell" && "bg-terminal-accent/15")}
          >
            dusk
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onThemeChange("dawnshell")}
            className={cn("cursor-pointer", theme === "dawnshell" && "bg-terminal-accent/15")}
          >
            dawn
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);

export default VimTerminalHeader;
