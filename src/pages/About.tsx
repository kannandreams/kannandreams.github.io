
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
          👋 Hi, I'm Kannan Kalidasan — you can call me KK.
My journey with code began back in 2005, and it’s been quite the ride since then. Over the years, I’ve grown into a Software Engineer and tech leader with a deep passion for building meaningful products — especially where Data and AI come into play.
What I enjoy most is operating at the intersection of Technology, Leadership, and Strategy. I’ve always had a thing for visual thinking and turning complex ideas into clear, actionable paths. Whether it's architecting a data system or shaping product direction, I love bringing ideas to life with purpose and clarity.

Outside of tech, I lean into the creative side too.
I’m an ENFJ (yep, "The Protagonist" if you’re into personality tests), and I’ve always been someone who blends logic with a touch of storytelling.
Tamil is my mother tongue — an ancient language I hold close — and in it, I write poems, some of which I share on Sundalpaper, my personal Substack.
More recently, I started Eggpuff Engineer — a newsletter where I explore ideas, share real-world experiences, and experiment with content creation. 
In many ways, it’s helping me live a small piece of the entrepreneur dream.          
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
