
import React from "react";
import { Send, Mail, Phone, Globe, Linkedin, Github } from "lucide-react";
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
  const isActive = mode === "insert";
  
  return (
    <div
      className="email-composer bg-transparent border border-[#555] rounded-sm mb-2"
      style={{
        borderTop: "none",
        borderLeft: "none",
        color: "#fff",
        fontFamily: "'JetBrains Mono', monospace",
        marginTop: "2.25rem",
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
        // Insert Mode - Show Email Composer
        <>
          <Textarea
            value={emailContent}
            onChange={onEmailChange}
            placeholder="Type your message here..."
            className="bg-terminal-background border-terminal-muted text-white w-full h-44 focus:border-terminal-bright-green text-sm resize-none"
            style={{ minHeight: 180, fontSize: "0.93rem" }}
            autoFocus
          />
          <div className="flex items-center justify-between mt-2">
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
        // Normal Mode - Show Contact Information
        <div className="p-4 space-y-3">
          <p className="text-terminal-muted text-[0.91rem] italic mb-3">
            Type <span className="text-terminal-accent">'i'</span> to enter insert mode and compose an email.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-terminal-accent" />
                <span className="text-white">email@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-terminal-accent" />
                <span className="text-white">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-terminal-accent" />
                <span className="text-white">example.com</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Linkedin size={16} className="text-terminal-accent" />
                <span className="text-white">linkedin.com/in/example</span>
              </div>
              <div className="flex items-center gap-2">
                <Github size={16} className="text-terminal-accent" />
                <span className="text-white">github.com/example</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VimTerminalEmailComposer;
