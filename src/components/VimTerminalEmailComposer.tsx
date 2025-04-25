import React from "react";
import { Send, Mail, User, MessageSquare, Phone, Globe, Linkedin, Github } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EmailFormData {
  senderName: string;
  senderEmail: string;
  reason: string;
  message: string;
}

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
  const form = useForm<EmailFormData>({
    defaultValues: {
      senderName: "",
      senderEmail: "",
      reason: "",
      message: emailContent,
    },
  });

  const handleSubmit = async (data: EmailFormData) => {
    try {
      // For now, we'll just show what would be sent
      console.log("Form data to be sent:", data);
      toast.success("Email functionality will be implemented with Resend API");
      onSendEmail();
    } catch (error) {
      toast.error("Failed to send email");
      console.error("Email send error:", error);
    }
  };
  
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
        <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="senderName" className="text-white">
                <User className="inline-block w-4 h-4 mr-2" />
                Name
              </Label>
              <Input
                id="senderName"
                className="bg-terminal-background border-terminal-muted text-white"
                {...form.register("senderName")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderEmail" className="text-white">
                <Mail className="inline-block w-4 h-4 mr-2" />
                Email
              </Label>
              <Input
                id="senderEmail"
                type="email"
                className="bg-terminal-background border-terminal-muted text-white"
                {...form.register("senderEmail")}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-white">
              <MessageSquare className="inline-block w-4 h-4 mr-2" />
              Reason for Contact (Optional)
            </Label>
            <Input
              id="reason"
              className="bg-terminal-background border-terminal-muted text-white"
              {...form.register("reason")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">Message</Label>
            <Textarea
              id="message"
              className="bg-terminal-background border-terminal-muted text-white w-full h-44 focus:border-terminal-bright-green text-sm resize-none"
              {...form.register("message")}
              required
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-terminal-muted text-xs">Press ESC to exit insert mode</p>
            <button
              type="submit"
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-terminal-muted bg-terminal-muted/10 hover:bg-terminal-muted/20 text-terminal-bright-green"
            >
              <Send size={14} />
              <span>Send</span>
            </button>
          </div>
        </form>
      ) : (
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
