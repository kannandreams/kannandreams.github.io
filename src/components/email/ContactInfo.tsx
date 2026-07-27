
import React from "react";
import { Mail, Globe, Linkedin, Github, Link as LinkIcon } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="p-4 space-y-3 overflow-hidden">
      <p className="text-terminal-muted text-[0.91rem] italic mb-3">
        Type <span className="text-terminal-accent">'i'</span> to enter insert mode and compose an email.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-terminal-accent" />
            <span className="text-terminal-foreground">kannanpoem1984@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-terminal-accent" />
            <span className="text-terminal-foreground">engineersmeetai.substack.com</span>
          </div>
          <div className="flex items-center gap-2">
            <LinkIcon size={16} className="text-terminal-accent" />
            <span className="text-terminal-foreground">adplist.org/mentors/kannan-kalidasan</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Linkedin size={16} className="text-terminal-accent" />
            <span className="text-terminal-foreground">linkedin.com/in/kannandreams/</span>
          </div>
          <div className="flex items-center gap-2">
            <Github size={16} className="text-terminal-accent" />
            <span className="text-terminal-foreground">github.com/kannandreams</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
