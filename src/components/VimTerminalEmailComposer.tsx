
import React from "react";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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
  // Show the email composer with active state if in insert mode
  const isActive = mode === "insert";
  
  return (
    <div
      className="email-composer bg-transparent border border-[#555] rounded-sm mb-2"
      style={{
        color: "#fff",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div className="flex items-center">
        <span
          className="px-2 py-0.5 font-semibold text-terminal-bright-green text-sm"
          style={{ fontWeight: 600, letterSpacing: 0.5 }}
        >
          {isActive ? "Email Composer (Insert Mode):" : "Email Composer:"}
        </span>
        <div className="flex-1 h-px bg-[#555] ml-3" />
      </div>
      {isActive ? (
        <>
          <Textarea
            value={emailContent}
            onChange={onEmailChange}
            placeholder="Type your message here..."
            className="bg-terminal-background border-terminal-muted text-white w-full h-28 focus:border-terminal-bright-green text-sm resize-none"
            style={{ minHeight: 80, fontSize: "0.93rem" }}
            autoFocus
          />
          <div className="flex items-center justify-between p-2">
            <p className="text-terminal-muted text-xs">Press ESC to exit insert mode and send</p>
            <button
              onClick={onSendEmail}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-terminal-muted bg-terminal-muted/10 hover:bg-terminal-muted/20 text-terminal-bright-green"
            >
              <Send size={14} />
              <span>Send</span>
            </button>
          </div>
        </>
      ) : (
        <p className="text-terminal-muted text-[0.91rem] p-2">Type 'i' to enter insert mode and compose your email.</p>
      )}
    </div>
  );
};

export default VimTerminalEmailComposer;
