import React from "react";
import { Terminal, FileText, Wrench, Download, Github, Linkedin, Rss, Heart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Link } from "react-router-dom";

const GITHUB_URL = "https://github.com/kannandreams";
const LINKEDIN_URL = "https://www.linkedin.com/in/kannandreams/";
const SUBSTACK_URL = "https://eggpuffengineer.substack.com/";

const NAV_SECTIONS = [
  { label: "Home", value: "home", command: ":home" },
  { label: "Skills", value: "skills", command: ":skills" },
  { label: "Projects", value: "projects", command: ":projects" },
  { label: "Blog", value: "blog", command: ":blog" },
  { label: "Contact", value: "email", command: ":contact" },
  { label: "About", value: "about", command: ":about" },
];

interface VimTerminalHeaderProps {
  devMode: boolean;
  onDevModeToggle: () => void;
  onDownloadResume: () => void;
  activeSection: string;
  mode: "normal" | "insert";
  onSectionSelect?: (section: string) => void;
  lightTheme?: boolean;
}

const CustomToggle = ({ checked, onClick }: { checked: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label={checked ? "Switch to Lite Mode" : "Switch to Dev Mode"}
    className={cn(
      "inline-flex items-center w-10 h-5 rounded-full relative transition-colors duration-300",
      checked 
        ? "bg-[--terminal-bright-green]" 
        : "bg-terminal-muted"
    )}
    type="button"
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
  onSectionSelect,
  lightTheme = false,
}) => (
  <div className={cn(
    "flex items-center justify-between px-4 pt-3 pb-1 border-b border-terminal-border",
    lightTheme ? "bg-white border-slate-200" : "bg-terminal-background"
  )}>
    <div className="flex items-center gap-3">
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <Github 
          size={22} 
          className={cn(
            "transition-all", 
            lightTheme ? "text-slate-700 hover:text-slate-900" : "text-terminal-bright-green"
          )} 
        />
      </a>
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <Linkedin 
          size={22} 
          className={cn(
            "transition-all", 
            lightTheme ? "text-slate-700 hover:text-slate-900" : "text-terminal-bright-green"
          )}
        />
      </a>
      <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" aria-label="Substack">
        <Rss 
          size={22} 
          className={cn(
            "transition-all", 
            lightTheme ? "text-slate-700 hover:text-slate-900" : "text-terminal-bright-green"
          )}
        />
      </a>
      <button
        onClick={showAppreciationToast}
        className={cn(
          "ml-2 p-1 rounded transition focus-visible:outline-none focus:ring-2",
          lightTheme 
            ? "hover:bg-slate-100 focus:ring-blue-400" 
            : "hover:bg-terminal-border/70 focus:ring-terminal-accent"
        )}
        title="Show appreciation"
        aria-label="Love this portfolio"
        type="button"
      >
        <Heart 
          size={21} 
          className={cn(
            "hover:scale-105 transition-transform",
            lightTheme ? "text-rose-500" : "text-terminal-bright-green"
          )} 
        />
      </button>
    </div>
    <div className="flex items-center space-x-2">
      <Terminal 
        size={16} 
        className={lightTheme ? "text-slate-700" : ""} 
      />
      <span 
        className={cn(
          "font-bold text-xl select-none",
          lightTheme ? "text-slate-800" : "text-terminal-bright-green"
        )}
        style={{fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace"}}
      >
        ~/.profile
      </span>
    </div>
    <div className="flex items-center gap-3">
      {!devMode ? (
        <>
          <div className="flex items-center">
            <span 
              className={cn(
                "mr-0.5 select-none text-base tracking-wide",
                lightTheme ? "text-slate-600" : "text-terminal-muted"
              )}
              style={{ fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace" }}
            >
              Lite Mode
            </span>
            <CustomToggle checked={devMode} onClick={onDevModeToggle} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "ml-3 flex items-center px-3 py-1 rounded-md border transition",
                  lightTheme 
                    ? "border-slate-300 hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                    : "border-terminal-muted hover:bg-terminal-muted/20 text-terminal-muted hover:text-terminal-bright-green"
                )}
                aria-label="Navigate Sections"
                type="button"
              >
                Navigate
                <ChevronDown size={16} className="ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[999] min-w-[155px]">
              {NAV_SECTIONS.map((section) => (
                <DropdownMenuItem
                  key={section.value}
                  onClick={() => {
                    if (onSectionSelect) onSectionSelect(section.value);
                  }}
                  className={cn(
                    "cursor-pointer",
                    lightTheme
                      ? activeSection === section.value && "bg-blue-50 text-blue-700"
                      : activeSection === section.value && "bg-terminal-accent/15"
                  )}
                  aria-label={section.label}
                >
                  {section.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={onDownloadResume}
            className={cn(
              "ml-3 flex items-center px-2 py-1 rounded-md border transition",
              lightTheme
                ? "border-slate-300 hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                : "border-terminal-muted hover:bg-terminal-muted/20 text-terminal-muted hover:text-terminal-bright-green"
            )}
            aria-label="Download Resume"
            type="button"
            disabled
          >
            <Download size={19} className="mr-1" />
            Resume
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
        </>
      )}
    </div>
  </div>
);

export default VimTerminalHeader;
