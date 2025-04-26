
import React from "react";

// Brief introduction for the static text
const intro =
  "
  👋 Hi, I'm Kannan Kalidasan (you can call me KK) — a Software Engineer and tech leader coding since 2005. I'm passionate about building meaningful products, especially in the Data and AI space.

I thrive at the intersection of Technology, Leadership, and Strategy, with a strong focus on visual and product thinking.

Quick Blurb:

🚩 Pi-shaped engineer with deep and broad experience since 2005.

🛠 Specialised in Data Engineering, Architecture, Analytics, and ML — a Data Guy at heart.

🧢 Worked across the spectrum — from <100 people startups to 10,000+ people enterprises.

💎 Strong mix of Data Engineering and AI/ML expertise — I enjoy crafting data-driven products.

💡 Big on product and strategic thinking — turning vision into actionable goals.

📚 Contributed to two PACKT books as a reviewer and co-author.
  
 "

const VimAbout: React.FC = () => {
  return (
    <div
      className="w-full py-1 px-2"
      style={{
        minHeight: 28,
      }}
    >
      <span className="text-white text-[1rem] font-semibold">{intro}</span>
    </div>
  );
};

export default VimAbout;
