
import React from "react";
import VimSkills from "./VimSkills";
import VimProjects from "./VimProjects";
import VimGithub from "./VimGithub";
import VimMetrics from "./VimMetrics";
import VimHelp from "./VimHelp";
import VimBlog from "./VimBlog";
import VimTerminalEmailComposer from "./VimTerminalEmailComposer";
import RecruiterResume from "./RecruiterResume";

interface VimTerminalBodyProps {
  devMode: boolean;
  activeSection: string;
  mode: "normal" | "insert";
  emailContent: string;
  onEmailChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendEmail: () => void;
  lastOutput: string;
  lastCommand: string;
  terminalBodyRef: React.RefObject<HTMLDivElement>;
}

const VimTerminalBody: React.FC<VimTerminalBodyProps> = ({
  devMode,
  activeSection,
  mode,
  emailContent,
  onEmailChange,
  onSendEmail,
  lastOutput,
  lastCommand,
  terminalBodyRef,
}) => {
  if (!devMode) return <RecruiterResume />;
  return (
    <div className="terminal-body flex-1 overflow-y-auto" ref={terminalBodyRef}>
      <div className="min-h-full pb-4">
        <div className="mb-4">
          {activeSection === "skills" && <VimSkills />}
          {activeSection === "projects" && <VimProjects />}
          {activeSection === "github" && <VimGithub />}
          {activeSection === "metrics" && <VimMetrics />}
          {activeSection === "help" && <VimHelp />}
          {activeSection === "blog" && <VimBlog />}
          
          {/* Only show email composer when email section is active */}
          {activeSection === "email" && (
            <VimTerminalEmailComposer
              mode={mode}
              emailContent={emailContent}
              onEmailChange={onEmailChange}
              onSendEmail={onSendEmail}
            />
          )}
        </div>
        
        <div className="mt-4 space-y-1">
          {lastOutput && <div className="text-white">{lastOutput}</div>}
          {lastCommand && (
            <div className="text-terminal-bright-green font-semibold">{lastCommand}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VimTerminalBody;

