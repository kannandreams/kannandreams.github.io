
import React from "react";
import { Ban, Mail, User, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface EmailFormData {
  senderName: string;
  senderEmail: string;
  reason: string;
  message: string;
}

interface EmailFormProps {
  onSubmit: (data: EmailFormData) => void;
  emailContent: string;
}

const EmailForm = ({ onSubmit, emailContent }: EmailFormProps) => {
  const form = useForm<EmailFormData>({
    defaultValues: {
      senderName: "",
      senderEmail: "",
      reason: "",
      message: emailContent,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4 overflow-hidden">
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
            disabled
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
            disabled
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
          disabled
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white">Message</Label>
        <Textarea
          id="message"
          className="bg-terminal-background border-terminal-muted text-white w-full h-24 focus:border-terminal-bright-green text-sm resize-none"
          {...form.register("message")}
          required
          disabled
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-terminal-muted text-xs flex items-center gap-2">
          <Ban size={14} className="text-red-500" />
          Email feature is currently unavailable
        </p>
        <button
          type="submit"
          disabled
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-terminal-muted bg-terminal-muted/10 text-gray-500 cursor-not-allowed"
        >
          <Ban size={14} />
          <span>Send</span>
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
