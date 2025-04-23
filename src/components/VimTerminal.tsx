
import React, { useState, useEffect, useRef } from "react";
import VimCommandLine from "./VimCommandLine";
import VimTerminalHeader from "./VimTerminalHeader";
import VimTerminalBody from "./VimTerminalBody";
import { cn } from "@/lib/utils";

// URLs for tools, resume, and email
const TOOLS_URL = "https://your-tools-list-url.com";
const RESUME_TEX_STATIC = "/resume.tex";
const EMAIL_ADDRESS = "your-email@example.com"; // Replace with your actual email

type Section = "skills" | "projects" | "github" | "metrics" | "help" | "blog" | "tools" | "email" | "about";

const VimTerminal: React.FC = () => {
  const [devMode, setDevMode] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<Section>("help");
  const [mode, setMode] = useState<"normal" | "insert">("normal");
  const [lastCommand, setLastCommand] = useState<string>("");
  const [lastOutput, setLastOutput] = useState<string>("");
  const [emailContent, setEmailContent] = useState<string>("");
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const executeCommand = (command: string) => {
    setLastCommand(`$ ${command}`);
    const cmd = command.trim().toLowerCase();

    if (cmd === ":q" || cmd === ":quit") {
      setLastOutput("Use browser navigation to exit. This is a web app!");
    } 
    else if (
      cmd === ":skills" ||
      cmd === ":projects" ||
      cmd === ":github" ||
      cmd === ":metrics" ||
      cmd === ":help" ||
      cmd === ":blog" ||
      cmd === ":about" ||
      cmd === "about"
    ) {
      const commands: Record<string, Section> = {
        ":skills": "skills",
        ":projects": "projects",
        ":github": "github",
        ":metrics": "metrics",
        ":help": "help",
        ":blog": "blog",
        ":about": "about",
        "about": "about"
      };
      setActiveSection(commands[cmd]);
      setLastOutput(`Opening ${commands[cmd]} panel...`);
    } else if (cmd === ":tools") {
      setLastOutput("Opening tools page in new window...");
      window.open(TOOLS_URL, "_blank", "noopener,noreferrer");
    } else if (cmd === ":clear") {
      setLastCommand("");
      setLastOutput("");
    } else if (cmd === ":email") {
      setActiveSection("email");
      setMode("normal");
      setLastOutput("-- EMAIL SECTION ACTIVATED (NORMAL MODE) --");
    } else if (cmd === "<esc>" && mode === "insert") {
      if (activeSection === "email" && emailContent.trim()) {
        const mailtoLink = `mailto:${EMAIL_ADDRESS}?subject=Message from Portfolio Website&body=${encodeURIComponent(emailContent)}`;
        window.open(mailtoLink);
        setLastOutput("Email client opened. Thank you for your message!");
        setEmailContent("");
      }
      setMode("normal");
      setLastOutput("-- NORMAL MODE --");
    } else if (cmd === "i" && mode === "normal") {
      setMode("insert");
      setLastOutput("-- INSERT MODE --");
      
      // Focus on the textarea if in email section
      if (activeSection === "email") {
        setTimeout(() => {
          const emailTextarea = document.querySelector('.email-composer textarea');
          if (emailTextarea) {
            (emailTextarea as HTMLTextAreaElement).focus();
          }
        }, 100);
      }
    } else {
      setLastOutput(`Command not found: ${command}`);
    }

    setTimeout(() => {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
    }, 0);
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lastOutput]);

  const handleDevModeToggle = () => {
    setDevMode((prev) => !prev);
    console.log("Dev mode toggled:", !devMode);
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = RESUME_TEX_STATIC;
    link.download = "resume.tex";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
  };

  const handleSendEmail = () => {
    if (emailContent.trim()) {
      const mailtoLink = `mailto:${EMAIL_ADDRESS}?subject=Message from Portfolio Website&body=${encodeURIComponent(emailContent)}`;
      window.open(mailtoLink);
      setLastOutput("Email client opened. Thank you for your message!");
      setEmailContent("");
      setMode("normal");
    }
  };

  // Handler for Recruiter nav dropdown: switches section and gives output
  const handleSectionSelect = (section: string) => {
    if (section === "home") {
      setDevMode(true);
      setActiveSection("help");
      setLastOutput("Returned to Home — Dev Mode Help Page.");
      setLastCommand(""); // Clear last command in this case
      return;
    }
    setActiveSection(section as Section);
    setLastOutput(`Opening ${section.charAt(0).toUpperCase() + section.slice(1)} panel...`);
    setLastCommand(""); // Clear last command in this case
  };

  const containerClasses = cn(
    "terminal-container min-h-screen max-w-7xl mx-auto overflow-hidden font-mono text-[0.95rem]",
    !devMode && "glass-morphism recruiter-mode"
  );

  return (
    <div className={containerClasses}>
      <VimTerminalHeader
        devMode={devMode}
        onDevModeToggle={handleDevModeToggle}
        onDownloadResume={handleDownloadResume}
        activeSection={activeSection}
        mode={mode}
        onSectionSelect={!devMode ? handleSectionSelect : undefined}
      />
      <div className={cn(
        devMode ? "h-[calc(100vh-170px)] flex flex-col" : "recruiter-mode-container",
        "overflow-hidden"
      )}>
        <VimTerminalBody
          devMode={devMode}
          activeSection={activeSection}
          mode={mode}
          emailContent={emailContent}
          onEmailChange={handleEmailChange}
          onSendEmail={handleSendEmail}
          lastOutput={lastOutput}
          lastCommand={lastCommand}
          terminalBodyRef={terminalBodyRef}
        />
        {devMode && (
          <>
            <div className="px-4 pb-2 pt-3 space-y-1">
              {lastOutput && <div className="text-white">{lastOutput}</div>}
              {lastCommand && (
                <div className="text-terminal-bright-green font-semibold">{lastCommand}</div>
              )}
            </div>
            <VimCommandLine
              onExecuteCommand={executeCommand}
              mode={mode}
              setMode={setMode}
              activeSection={activeSection}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VimTerminal;
