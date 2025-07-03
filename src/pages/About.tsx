
import React from "react";
import { Github, Linkedin, Rss } from "lucide-react";

const GITHUB_URL = "https://github.com/kannandreams";
const LINKEDIN_URL = "https://www.linkedin.com/in/kannandreams/";
const SUBSTACK_URL = "https://engineersmeetai.substack.com/";

const About = () => {
  return (
    <div className="min-h-screen bg-terminal-background text-terminal-foreground py-10 px-4 flex justify-center items-start">
      <div className="max-w-xl w-full bg-terminal paper rounded-lg shadow-lg p-8 border border-terminal-border">
        <h1 className="text-3xl font-bold mb-2 text-terminal-accent">About Me</h1>
        <p className="text-base text-white mb-6">
          👋 Hi, I'm KK
        </p>
        <p className="text-terminal-muted mb-4">
          I do ...
        </p>
        <div className="flex items-center space-x-4 mt-6">
          <a href={GITHUB_URL} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <Github size={26} className="text-terminal-bright-green hover:scale-110 transition-transform" />
          </a>
          <a href={LINKEDIN_URL} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <Linkedin size={26} className="text-terminal-bright-green hover:scale-110 transition-transform" />
          </a>
          <a href={SUBSTACK_URL} aria-label="Substack" target="_blank" rel="noopener noreferrer">
            <Rss size={26} className="text-terminal-bright-green hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
