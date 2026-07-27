
import React from "react";
import VimSkills from "./VimSkills";
import VimProjects from "./VimProjects";
import VimBlog from "./VimBlog";
import VimHelp from "./VimHelp";
import VimTerminalEmailComposer from "./VimTerminalEmailComposer";
import RecruiterResume from "./RecruiterResume";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  onSectionSelect?: (section: string) => void;
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
  onSectionSelect,
}) => {
  // In Lite Mode, render the appropriate section based on activeSection
  if (!devMode) {
    return (
      <div 
        className="terminal-body recruiter-mode-body p-4 overflow-hidden"
        ref={terminalBodyRef}
        style={{ overflowY: 'hidden', overflowX: 'hidden' }}
      >
        {activeSection === "skills" && <VimSkills />}
        {activeSection === "projects" && <VimProjects />}
        {activeSection === "help" && <VimHelp activeSection="help" devMode={devMode} onSectionSelect={onSectionSelect} />}
        {activeSection === "about" && <VimHelp activeSection="about" devMode={devMode} onSectionSelect={onSectionSelect} />}
        {activeSection === "blog" && <VimBlog />}
        {activeSection === "email" && (
          <div className="overflow-hidden">
            <VimTerminalEmailComposer
              mode={mode}
              emailContent={emailContent}
              onEmailChange={onEmailChange}
              onSendEmail={onSendEmail}
            />
          </div>
        )}
      </div>
    );
  }

  // Original dev mode rendering
  return (
    <ScrollArea className="terminal-body flex-1" ref={terminalBodyRef}>
      <div className="min-h-full pb-4">
        <div className="mb-4">
          {activeSection === "skills" && <VimSkills />}
          {activeSection === "projects" && <VimProjects />}
          {activeSection === "help" && <VimHelp activeSection="help" devMode={devMode} onSectionSelect={onSectionSelect} />}
          {activeSection === "about" && <VimHelp activeSection="about" devMode={devMode} onSectionSelect={onSectionSelect} />}
          {activeSection === "blog" && <VimBlog />}
          {activeSection === "email" && (
            <div className="overflow-hidden">
              <VimTerminalEmailComposer
                mode={mode}
                emailContent={emailContent}
                onEmailChange={onEmailChange}
                onSendEmail={onSendEmail}
              />
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default VimTerminalBody;
