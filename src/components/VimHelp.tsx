import React from 'react';
import { Mail, Book, Wrench, Star, List, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const navCommands = [
  { label: ":about", desc: "See my short intro", emoji: "👨‍💻" },
  { label: ":skills", desc: "View my skills", emoji: "💼" },
  { label: ":projects", desc: "View my projects", emoji: "📁" },
  { label: ":blog", desc: "Latest blog posts", emoji: "📝" },
  { label: ":contact", desc: "Get in touch with me", emoji: "📧" },
  { label: ":help", desc: "Show this page", emoji: "❔" },
  { label: ":clear", desc: "Clear terminal", emoji: "🧹" },
  { label: ":q", desc: "Attempt to quit", emoji: "🚪" },
];

const midpoint = Math.ceil(navCommands.length / 2);
const firstCol = navCommands.slice(0, midpoint);
const secondCol = navCommands.slice(midpoint);

const VimHelp: React.FC<{ activeSection?: string }> = ({ activeSection }) => {
  return (
    <div className="vim-help animate-fade-in text-white">
      {activeSection === "about" ? (
        <div className="bg-transparent p-3 rounded mb-3">
          <h2 className="text-terminal-accent text-xl mb-2">About Me</h2>
          <p className="text-white text-base">
            👋 Hi, I'm Kannan Kalidasan — you can call me <i>KK</i>. <br></br>
            
            I am Software engineer and Tech leader coding since 2005, based in UK. My core expertise lies in Data, Analytics, ML and Backend systems.
            What I enjoy most is operating at the intersection of <span className='text-terminal-bright-green select-none'>Technology, Leadership, and Strategy. </span>
            Visual thinking and teaching are the best add-on gift stays with me.
          </p>
          <br></br>
          <p className="mt-2">
          <u>Quick Blurb:</u> <br></br>
          🧢 Worked across the business domains, build products & teams for startups to 10,000+ people tech companies. <br></br>
          💎 Strong mix of Data and AI/ML expertise is a perfect combo.<br></br>
          👨🏻 I’m an <span className='text-terminal-accent'>ENFJ</span> (yep, "The Protagonist" per personality test).<br></br>
          😎 Fun fact : <span className='text-terminal-accent'>I’m a huge fan of egg puffs 🥟</span>. They were my go-to breakfast for many years. Not anymore, but the love remains.<br></br><br></br>
          </p>  
          <p className="mt-2">
          <u>Outside of Work:</u> More recently, I started <a href="https://en.wikipedia.org/wiki/Tamil_language" target="_blank" rel="noopener noreferrer" aria-label="lovable" className="text-terminal-bright-green" >Eggpuff Engineer</a> — a substack newsletter 
            where I primarily write about Engineering insights, AI , experiences, and experiments. In many ways, it’s helping me live a small piece of my entrepreneur dream.<br></br><br></br>
          </p>
          <p className="mt-2">
            <u>Outside of Tech:</u> I lean into the <i>creative side</i> too.<br></br>
            I speak & think in <a href="https://en.wikipedia.org/wiki/Tamil_language" target="_blank" rel="noopener noreferrer" aria-label="lovable" className="" ><u>Tamizh</u></a>, 
            so I write poems, random mobile clicks ( as if I think as photographer ) some of which I share via <a href="https://sundalpaper.substack.com/about" target="_blank" rel="noopener noreferrer" aria-label="lovable" className="text-terminal-bright-green" >Sundalpaper</a>, my personal Substack space.
            <br></br>
          </p>
          <p className="text-terminal-muted mt-2 italic">
            For collaboration, type a command <span className='text-terminal-accent'>:contact</span>
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-terminal-accent text-xl mb-2">Kannan Kalidasan</h2>
          <div className="bg-transparent p-3 rounded mb-3">
            {/* <h3 className="text-terminal-primary mb-2">About Me</h3> */}
            <p className="text-teal-400">
              Hello! I'm a data-savvy software engineer who loves building products, teams, and the culture that powers them. <br />
              Type a command below to explore my portfolio !
            </p>
          </div>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="border border-[#555] rounded-sm bg-transparent col-span-1 px-0 pb-1 relative">
              <div className="flex items-center pl-1">
                <span className="px-2 py-0.5 font-semibold text-terminal-bright-green text-sm ml-2" style={{ fontWeight: 600, letterSpacing: 0.5 }}>
                  Navigation Commands
                </span>
                <div className="flex-1 h-px bg-[#555] ml-3" />
              </div>
              <div className="grid grid-cols-2 gap-y-1 gap-x-2 mt-2 pl-4 pr-2">
                {firstCol.map(({ label, desc, emoji }) => (
                  <div key={label} className="flex items-baseline space-x-2">
                    <span className="text-terminal-accent min-w-[62px]">{label}</span>
                    <span className="text-xs text-white">
                      <span className="mr-1" role="img" aria-label="icon">{emoji}</span>
                      {desc}
                    </span>
                  </div>
                ))}
                {secondCol.map(({ label, desc, emoji }) => (
                  <div key={label} className="flex items-baseline space-x-2">
                    <span className="text-terminal-accent min-w-[62px]">{label}</span>
                    <span className="text-xs text-white">
                      <span className="mr-1" role="img" aria-label="icon">{emoji}</span>
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[#555] rounded-sm bg-transparent col-span-1 px-0 pb-1 relative">
              <div className="flex items-center pl-1">
                <span className="px-2 py-0.5 font-semibold text-terminal-bright-green text-sm ml-2" style={{ fontWeight: 600, letterSpacing: 0.5 }}>
                  Command Tips
                </span>
                <div className="flex-1 h-px bg-[#555] ml-3" />
              </div>
              <ul className="space-y-1 mt-2 text-xs text-white pl-4">
                <li>Commands are case-insensitive.</li>
                <li>
                  Type <span className="text-terminal-accent">i</span> to enter Insert Mode [ contact page ]; <span className="text-terminal-accent">&lt;ESC&gt;</span> returns to Normal.
                </li>
                <li>Use Recruiter Mode toggle on top-right <span className='text-green-700'> // disabled resume download option atm </span></li>
                <li>
                  Ready to explore? Try <span className="text-terminal-accent">:skills</span> or <span className="text-terminal-accent">:projects</span>!
                </li>
              </ul>
            </div>
          </div>
          <div className="text-white border-l-2 border-terminal-accent pl-3 mt-2 text-sm">
            <p>
              This page is inspired by the Vim editor interface. It was built through pure vibe coding with ❤️ and 
              <a href="https://lovable.dev/" target="_blank" rel="noopener noreferrer" aria-label="lovable" className= "text-rose-700"> lovable.</a><br />
              Undeniable proof: I'm a certified vibe coder. 💻🎧⚡
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default VimHelp;
