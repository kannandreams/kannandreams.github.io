
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
      <div className="terminal-body h-full overflow-y-auto flex flex-col" ref={terminalBodyRef}>
        <div className="mb-4 flex-shrink-0 flex-1">
          {/* Always force email composer visible at bottom */}
          {activeSection === "skills" && <VimSkills />}
          {activeSection === "projects" && <VimProjects />}
          {activeSection === "github" && <VimGithub />}
          {activeSection === "metrics" && <VimMetrics />}
          {activeSection === "help" && <VimHelp />}
          {activeSection === "blog" && <VimBlog />}
        </div>
        {/* Email composer is always at the bottom and visible */}
        <div className="mt-2">
          <VimTerminalEmailComposer
            mode={activeSection === "email" ? mode : "normal"}
            emailContent={emailContent}
            onEmailChange={onEmailChange}
            onSendEmail={onSendEmail}
            alwaysVisible={true}
          />
        </div>
        <div className="mt-1">
          {lastOutput && <div className="mb-1 text-white">{lastOutput}</div>}
          {lastCommand && (
            <div className="mb-1 text-terminal-bright-green font-semibold">{lastCommand}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default VimTerminalBody;
