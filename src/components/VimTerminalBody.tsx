
import React from "react";
import VimSkills from "./VimSkills";
import VimProjects from "./VimProjects";
import VimBlog from "./VimBlog";
import VimHelp from "./VimHelp";
import VimTerminalEmailComposer from "./VimTerminalEmailComposer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VimTerminalBodyProps {
  activeSection: string;
  mode: "normal" | "insert";
  emailContent: string;
  onEmailChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendEmail: () => void;
  terminalBodyRef: React.RefObject<HTMLDivElement>;
}

const VimTerminalBody: React.FC<VimTerminalBodyProps> = ({
  activeSection,
  mode,
  emailContent,
  onEmailChange,
  onSendEmail,
  terminalBodyRef,
}) => {
  return (
    <ScrollArea className="terminal-body flex-1" ref={terminalBodyRef}>
      <div className="min-h-full pb-4">
        <div className="mb-4">
          {activeSection === "skills" && <VimSkills />}
          {activeSection === "projects" && <VimProjects />}
          {activeSection === "help" && <VimHelp activeSection="help" />}
          {activeSection === "about" && <VimHelp activeSection="about" />}
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
