
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
    <>
      <div ref={terminalBodyRef} className="terminal-body h-full overflow-y-auto flex flex-col">
        <div className="mb-4 flex-shrink-0">
          {activeSection === "skills" && <VimSkills />}
          {activeSection === "projects" && <VimProjects />}
          {activeSection === "github" && <VimGithub />}
          {activeSection === "metrics" && <VimMetrics />}
          {activeSection === "help" && <VimHelp />}
          {activeSection === "blog" && <VimBlog />}
          {activeSection === "email" && (
            <VimTerminalEmailComposer
              mode={mode}
              emailContent={emailContent}
              onEmailChange={onEmailChange}
              onSendEmail={onSendEmail}
            />
          )}
        </div>
        <div className="mt-auto">
          {lastOutput && (
            <div className="mb-1">
              {lastOutput}
            </div>
          )}
          {lastCommand && (
            <div className="mb-1 text-terminal-bright-green font-semibold">
              {lastCommand}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VimTerminalBody;
