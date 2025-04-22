
import React from "react";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface VimTerminalEmailComposerProps {
  mode: "normal" | "insert";
  emailContent: string;
  onEmailChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendEmail: () => void;
}

const VimTerminalEmailComposer: React.FC<VimTerminalEmailComposerProps> = ({
  mode,
  emailContent,
  onEmailChange,
  onSendEmail,
}) => (
  <div className="email-composer p-2 border border-terminal-muted rounded-md mb-4 mt-6">
    <h3 className="text-terminal-bright-green mb-2">
      {mode === "insert" ? "Composing Email:" : "Email Composer:"}
    </h3>
    {mode === "insert" ? (
      <>
        <Textarea
          value={emailContent}
          onChange={onEmailChange}
          placeholder="Type your message here..."
          className="bg-terminal-background border-terminal-muted text-terminal-foreground w-full h-32 focus:border-terminal-bright-green"
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
      <p className="text-terminal-muted">Type 'i' to enter insert mode and compose your email.</p>
    )}
  </div>
);

export default VimTerminalEmailComposer;
