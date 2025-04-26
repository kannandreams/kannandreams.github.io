
import React from "react";
import { Github, Linkedin, Rss } from "lucide-react";

const GITHUB_URL = "https://github.com/kannandreams";
const LINKEDIN_URL = "https://www.linkedin.com/in/kannandreams/";
const SUBSTACK_URL = "https://eggpuffengineer.substack.com/";

const About = () => {
  return (
    <div className="min-h-screen bg-terminal-background text-terminal-foreground py-10 px-4 flex justify-center items-start">
      <div className="max-w-xl w-full bg-terminal paper rounded-lg shadow-lg p-8 border border-terminal-border">
        <h1 className="text-3xl font-bold mb-2 text-terminal-accent">About Me</h1>
        <p className="text-base text-white mb-6">
          👋 Hi, I'm KaK — a deeply curious and collaborative software engineer passionate about making meaningful products, especially in web, developer tools, and AI. I thrive building elegant products, shipping iteratively, and bringing energy to every team.
        </p>
        <p className="text-terminal-muted mb-4">
          I enjoy architecting scalable, robust web applications, collaborating with cross-functional teams, and building tools that empower others. My toolkit spans frontend frameworks, full-stack solutions, and modern infrastructure. Let's connect or check out some of my work!
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
