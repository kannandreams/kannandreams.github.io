
import React from "react";
import { toast } from "sonner";
import EmailForm from "./email/EmailForm";
import ContactInfo from "./email/ContactInfo";

interface VimTerminalEmailComposerProps {
  mode: "normal" | "insert";
  emailContent: string;
  onEmailChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendEmail: () => void;
  alwaysVisible?: boolean;
}

const VimTerminalEmailComposer: React.FC<VimTerminalEmailComposerProps> = ({
  mode,
  emailContent,
  onEmailChange,
  onSendEmail,
  alwaysVisible = false,
}) => {
  const isActive = mode === "insert";

  const handleSubmit = async () => {
    toast.error("Email feature is currently unavailable", {
      description: "We're working on bringing this feature back soon!"
    });
  };

  return (
    <div
      className="email-composer bg-transparent border border-[#555] rounded-sm"
      style={{
        borderTop: "none",
        borderLeft: "none",
        color: "#fff",
        fontFamily: "'JetBrains Mono', monospace",
        marginTop: "0.25rem",
        height: "auto",
        maxHeight: "calc(100vh - 240px)",
        overflow: "hidden"
      }}
    >
      <div className="flex items-center">
        <span
          className="px-2 py-0.5 font-semibold text-terminal-bright-green text-sm"
          style={{ fontWeight: 600, letterSpacing: 0.5 }}
        >
          {isActive ? "Email Composer:" : "Contact Information:"}
        </span>
        <div className="flex-1 h-px bg-[#555] ml-3" />
      </div>
      
      {isActive ? (
        <EmailForm onSubmit={handleSubmit} emailContent={emailContent} />
      ) : (
        mode === "normal" && <ContactInfo />
      )}
    </div>
  );
};

export default VimTerminalEmailComposer;
