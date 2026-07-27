import React, { useEffect } from "react";
import { User, Wrench, FolderOpen, FileText, Mail, HelpCircle, Trash2, LogOut } from "lucide-react";

const navCommands = [
  { label: ":about", desc: "See my short intro", icon: <User size={14} />, action: "about" },
  { label: ":skills", desc: "View my skills", icon: <Wrench size={14} />, action: "skills" },
  { label: ":projects", desc: "View my projects", icon: <FolderOpen size={14} />, action: "projects" },
  { label: ":blog", desc: "Latest blog posts", icon: <FileText size={14} />, action: "blog" },
  { label: ":contact", desc: "Get in touch with me", icon: <Mail size={14} />, action: "email" },
  { label: ":help", desc: "Show this page", icon: <HelpCircle size={14} />, action: "help" },
  { label: ":clear", desc: "Clear terminal", icon: <Trash2 size={14} />, action: "clear" },
  { label: ":q", desc: "Attempt to quit", icon: <LogOut size={14} />, action: "quit" },
];

const midpoint = Math.ceil(navCommands.length / 2);
const firstCol = navCommands.slice(0, midpoint);
const secondCol = navCommands.slice(midpoint);

const VimHelp: React.FC<{
  activeSection?: string;
}> = ({ activeSection }) => {
  // Track page views for about and help sections
  useEffect(() => {
    if (activeSection === "about" && window.gtag) {
      window.gtag("event", "view_item", {
        event_category: "Content",
        event_label: "About Me Section",
        content_type: "about",
      });
      console.log("About Me section view tracked in GA");
    }
  }, [activeSection]);

  return (
    <div className="vim-help animate-fade-in text-terminal-foreground">
      {activeSection === "about" ? (
        <div className="bg-transparent p-3 rounded mb-3">
          <h2 className="text-terminal-accent text-xl mb-2">About Me</h2>
          <p className="text-terminal-foreground text-base">
            👋 Hi, I'm Kannan Kalidasan — you can call me <i>KK</i>. <br></br>
            I'm a Software Engineer and Tech Leader based in the UK, with
            expertise in Data, Analytics, ML, and Backend systems. I've been
            coding since 2005. What I enjoy most is operating at the
            intersection of{" "}
            <span className="text-terminal-accent select-none">
              Technology, Leadership, and Strategy.{" "}
            </span>
            visual thinking and teaching are the best add-on gift stays with me.
          </p>
          <p className="mt-2">
            <br></br>
            <u>Quick Blurb:</u> <br></br>
            🧢 Worked across various business domains, building products & teams
            for startups to large tech companies. <br></br>
            💎 Strong mix of Data and AI/ML expertise is a perfect combo.
            <br></br>
            📚 Served as Technical Reviewer for {" "}
            <a
              href="https://www.amazon.co.uk/Data-Visualization-Cookbook-Atmajitsinh-Gohil/dp/1783989505"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="lovable"
              className="text-terminal-accent"
            >
              R Data Visualization Cookbook
            </a>{" "}
            and Contributing Author for {" "}
            <a
              href="https://www.everand.com/book/365185281/Introduction-to-R-for-Business-Intelligence"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="lovable"
              className="text-terminal-accent"
            >
              R for Business Intelligence
            </a>{" "}
            <br></br>
            👨🏻 I'm an <span className="text-terminal-accent">ENFJ</span> (yep,
            "The Protagonist" per personality test).<br></br>
            😎 Fun fact :{" "}
            <span className="text-terminal-accent">
              I'm a huge fan of egg puffs 🥟
            </span>
            . They were my go-to breakfast for many years. Not anymore, but the
            love remains.<br></br>
            <br></br>
          </p>
          <p className="mt-2">
            <u>Outside of Work:</u><br></br>
            - I write{" "}
            <a
              href="https://engineersmeetai.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="lovable"
              className="text-terminal-accent"
            >
              When Engineers meet AI
            </a>{" "}
            — a Substack newsletter where I explore how scalable, intelligent systems are built across Data, AI tooling, Software Engineering, and engineering philosophy.
            Through hands-on experiments, real-world experiences, and personal reflections, in many ways, it's helping me live a small piece of my entrepreneurial dream.<br></br>
            - Mentor people worldwide through {" "}
            <a
              href="https://adplist.org/mentors/kannan-kalidasan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="lovable"
              className="text-terminal-accent"
            >
              ADPList.org
            </a>{" "}
          </p>
          <p className="mt-2">
            <u>Outside of Tech:</u><br></br>
            I lean into the <i>creative side</i> too.I speak & think in{" "}
            <a
              href="https://en.wikipedia.org/wiki/Tamil_language"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="lovable"
              className="text-terminal-accent"
            >
              Tamizh (தமிழ்)
            </a>{" "}
            natively, so I write poems and take random mobile clicks (as if I
            think like a photographer) some of which I share via{" "}
            <a
              href="https://sundalpaper.substack.com/about"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="lovable"
              className="text-terminal-accent"
            >
              Sundalpaper
            </a>
            , my personal Substack space.
            <br></br>
          </p>
          <p className="text-terminal-muted mt-2 italic">
            For collaboration, type a command{" "}
            <span className="text-terminal-accent">:contact</span>
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-terminal-accent text-xl mb-2">
            Kannan Kalidasan
          </h2>
          <div className="bg-transparent p-3 rounded mb-3">
            <p className="text-terminal-foreground">
              Hello! I'm a data-driven Software Engineer passionate about
              building products, teams, and the culture that fuels them.
            </p>
          </div>

          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="border border-terminal-border rounded-sm bg-transparent col-span-1 px-0 pb-1 relative">
              <div className="flex items-center pl-1">
                <span
                  className="px-2 py-0.5 font-semibold text-terminal-foreground text-sm ml-2"
                  style={{ fontWeight: 600, letterSpacing: 0.5 }}
                >
                  Navigation Commands
                </span>
                <div className="flex-1 h-px bg-terminal-border ml-3" />
              </div>
              <div className="grid grid-cols-2 gap-y-1 gap-x-2 mt-2 pl-4 pr-2">
                {firstCol.map(({ label, desc, icon }) => (
                  <div key={label} className="flex items-baseline space-x-2">
                    <span className="text-terminal-accent min-w-[62px]">
                      {label}
                    </span>
                    <span className="text-xs text-terminal-muted flex items-center gap-1">
                      <span className="text-terminal-muted">{icon}</span>
                      {desc}
                    </span>
                  </div>
                ))}
                {secondCol.map(({ label, desc, icon }) => (
                  <div key={label} className="flex items-baseline space-x-2">
                    <span className="text-terminal-accent min-w-[62px]">
                      {label}
                    </span>
                    <span className="text-xs text-terminal-muted flex items-center gap-1">
                      <span className="text-terminal-muted">{icon}</span>
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-terminal-border rounded-sm bg-transparent col-span-1 px-0 pb-1 relative">
              <div className="flex items-center pl-1">
                <span
                  className="px-2 py-0.5 font-semibold text-terminal-foreground text-sm ml-2"
                  style={{ fontWeight: 600, letterSpacing: 0.5 }}
                >
                  Command Tips
                </span>
                <div className="flex-1 h-px bg-terminal-border ml-3" />
              </div>
              <ul className="space-y-1 mt-2 text-xs text-terminal-muted pl-4">
                <li>Commands are case-insensitive.</li>
                <li>
                  Type <span className="text-terminal-accent">i</span> to
                  enter Insert Mode [ contact page ];{" "}
                  <span className="text-terminal-accent">&lt;ESC&gt;</span>{" "}
                  returns to Normal.
                </li>
                <li>
                  Use top tabs or type commands to navigate sections.
                </li>
                <li>
                  Ready to explore? Try{" "}
                  <span className="text-terminal-accent">:skills</span> or{" "}
                  <span className="text-terminal-accent">:projects</span>!
                </li>
              </ul>
            </div>
          </div>

          <div className="text-terminal-muted border-l-2 border-terminal-accent pl-3 mt-2 text-sm">
            <p>
              This page is inspired by the Vim interface. 💻🎧⚡
              <br />
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default VimHelp;
