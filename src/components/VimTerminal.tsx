
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, FileText, Wrench, Download, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import VimCommandLine from './VimCommandLine';
import VimSkills from './VimSkills';
import VimProjects from './VimProjects';
import VimGithub from './VimGithub';
import VimMetrics from './VimMetrics';
import VimHelp from './VimHelp';
import VimBlog from './VimBlog';
import RecruiterResume from './RecruiterResume';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Rss } from "lucide-react";

const TOOLS_URL = "https://your-tools-list-url.com";
const RESUME_TEX_STATIC = "/resume.tex";
const EMAIL_ADDRESS = "your-email@example.com"; // Replace with your actual email

type Section = 'skills' | 'projects' | 'github' | 'metrics' | 'help' | 'blog' | 'tools' | 'email';

const GITHUB_URL = "https://github.com/";
const LINKEDIN_URL = "https://linkedin.com/";
const SUBSTACK_URL = "https://substack.com/profile/";

const VimTerminal: React.FC = () => {
  const [devMode, setDevMode] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<Section>('help');
  const [mode, setMode] = useState<'normal' | 'insert'>('normal');
  const [history, setHistory] = useState<string[]>([]);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [emailContent, setEmailContent] = useState<string>('');
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const executeCommand = (command: string) => {
    setLastCommand(`$ ${command}`);
    const cmd = command.trim().toLowerCase();

    if (cmd === ':q' || cmd === ':quit') {
      setHistory(prev => [...prev, "Use browser navigation to exit. This is a web app!"]);
    } 
    else if (cmd === ':skills' || cmd === ':projects' || cmd === ':github' || cmd === ':metrics' || cmd === ':help' || cmd === ':blog') {
      const commands: Record<string, Section> = {
        ':skills': 'skills',
        ':projects': 'projects',
        ':github': 'github',
        ':metrics': 'metrics',
        ':help': 'help',
        ':blog': 'blog',
      };
      setActiveSection(commands[cmd]);
      setHistory(prev => [...prev, `Opening ${commands[cmd]} panel...`]);
    }
    else if (cmd === ':tools') {
      setHistory(prev => [...prev, "Opening tools page in new window..."]);
      window.open(TOOLS_URL, "_blank", "noopener,noreferrer");
    }
    else if (cmd === ':clear') {
      setHistory([]);
      setLastCommand('');
    }
    else if (cmd === ':email') {
      setActiveSection('email');
      setHistory(prev => [...prev, "Enter insert mode to compose an email..."]);
    }
    else if (cmd === 'i' && mode === 'normal') {
      setMode('insert');
      setHistory(prev => [...prev, "-- INSERT MODE --"]);
    }
    else if (cmd === '<esc>' && mode === 'insert') {
      if (activeSection === 'email' && emailContent.trim()) {
        // Send email logic
        const mailtoLink = `mailto:${EMAIL_ADDRESS}?subject=Message from Portfolio Website&body=${encodeURIComponent(emailContent)}`;
        window.open(mailtoLink);
        setHistory(prev => [...prev, "Email client opened. Thank you for your message!"]);
        setEmailContent('');
      }
      
      setMode('normal');
      setHistory(prev => [...prev, "-- NORMAL MODE --"]);
    }
    else {
      setHistory(prev => [...prev, `Command not found: ${command}`]);
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
  }, [history]);

  const handleDevModeToggle = () => {
    setDevMode((prev) => !prev);
    console.log("Dev mode toggled:", !devMode);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = RESUME_TEX_STATIC;
    link.download = 'resume.tex';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
  };

  const containerClasses = cn(
    "terminal-container min-h-screen max-w-7xl mx-auto overflow-hidden font-mono text-[0.95rem]", 
    !devMode && "glass-morphism recruiter-mode"
  );

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

  return (
    <div className={containerClasses}>
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
                <span
                  className="mr-0.5 text-terminal-muted select-none text-base tracking-wide"
                  style={{ fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace" }}
                >
                  Recruiter Mode
                </span>
                <CustomToggle checked={devMode} onClick={handleDevModeToggle} />
              </div>
              <button
                onClick={handleDownloadResume}
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
                <span
                  className="mr-0.5 text-terminal-muted select-none text-base tracking-wide"
                  style={{ fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace" }}
                >
                  Dev Mode
                </span>
                <CustomToggle checked={devMode} onClick={handleDevModeToggle} />
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
      <div className={cn(
        devMode ? "h-[calc(100vh-170px)]" : "recruiter-mode-container",
        "overflow-hidden"
      )}>
        {devMode ? (
          <>
            <div ref={terminalBodyRef} className="terminal-body h-full overflow-y-auto flex flex-col">
              <div className="mb-4 flex-shrink-0">
                {activeSection === 'skills' && <VimSkills />}
                {activeSection === 'projects' && <VimProjects />}
                {activeSection === 'github' && <VimGithub />}
                {activeSection === 'metrics' && <VimMetrics />}
                {activeSection === 'help' && <VimHelp />}
                {activeSection === 'blog' && <VimBlog />}
                {activeSection === 'email' && mode === 'insert' && (
                  <div className="email-composer p-2 border border-terminal-muted rounded-md mb-4">
                    <h3 className="text-terminal-bright-green mb-2">Compose Message:</h3>
                    <Textarea 
                      value={emailContent}
                      onChange={handleEmailChange}
                      placeholder="Type your message here..."
                      className="bg-terminal-background border-terminal-muted text-terminal-foreground w-full h-32 focus:border-terminal-bright-green"
                    />
                    <p className="text-terminal-muted text-xs mt-1">Press ESC to exit insert mode and send</p>
                  </div>
                )}
              </div>
              <div className="mt-auto">
                {history.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))}
                {lastCommand && (
                  <div className="mb-1 text-terminal-bright-green font-semibold">
                    {lastCommand}
                  </div>
                )}
              </div>
            </div>
            <VimCommandLine onExecuteCommand={executeCommand} mode={mode} setMode={setMode} />
          </>
        ) : (
          <RecruiterResume />
        )}
      </div>
    </div>
  );
};

export default VimTerminal;
