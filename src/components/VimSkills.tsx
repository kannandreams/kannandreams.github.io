
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Code, BrainCircuit, Layers, Database, Globe, Palette } from 'lucide-react';

// Skill categories and items
const skillsData = [
  {
    category: 'Frontend Development',
    icon: <Code size={18} className="text-terminal-primary" />,
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'React', level: 92 },
      { name: 'Vue.js', level: 75 },
      { name: 'HTML5/CSS3', level: 88 },
      { name: 'Tailwind CSS', level: 90 },
    ]
  },
  {
    category: 'Backend Development',
    icon: <Layers size={18} className="text-terminal-primary" />,
    skills: [
      { name: 'Node.js', level: 86 },
      { name: 'Express', level: 84 },
      { name: 'Python', level: 79 },
      { name: 'Django', level: 70 },
      { name: 'FastAPI', level: 78 },
    ]
  },
  {
    category: 'Database & Cloud',
    icon: <Database size={18} className="text-terminal-primary" />,
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'Firebase', level: 82 },
      { name: 'Docker', level: 78 },
    ]
  },
  {
    category: 'UI/UX Design',
    icon: <Palette size={18} className="text-terminal-primary" />,
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'Adobe XD', level: 76 },
      { name: 'Responsive Design', level: 90 },
      { name: 'Accessibility', level: 82 },
    ]
  },
  {
    category: 'Other Skills',
    icon: <Globe size={18} className="text-terminal-primary" />,
    skills: [
      { name: 'Git/GitHub', level: 92 },
      { name: 'CI/CD', level: 80 },
      { name: 'Agile/Scrum', level: 85 },
      { name: 'TDD', level: 78 },
      { name: 'Performance Optimization', level: 84 },
    ]
  },
];

const VimSkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useIsMobile();

  return (
    <div className="vim-skills animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <BrainCircuit className="text-terminal-secondary" />
        <h2 className="text-terminal-accent text-xl font-semibold">Skills & Expertise</h2>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {skillsData.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-1.5 rounded-md flex items-center space-x-2 transition-colors ${
                activeTab === index 
                  ? 'bg-terminal-border text-terminal-foreground' 
                  : 'bg-terminal-background hover:bg-terminal-border/30 text-terminal-muted'
              }`}
            >
              {category.icon}
              <span>{isMobile ? '' : category.category}</span>
            </button>
          ))}
        </div>

        {/* Skills display */}
        <div className="bg-terminal-border/20 rounded-md p-4">
          <h3 className="text-terminal-primary text-lg mb-4 flex items-center gap-2">
            {skillsData[activeTab].icon}
            <span>{skillsData[activeTab].category}</span>
          </h3>
          
          <div className="space-y-4">
            {skillsData[activeTab].skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="flex justify-between mb-1">
                  <span className="text-terminal-foreground">{skill.name}</span>
                  <span className="text-terminal-muted">{skill.level}%</span>
                </div>
                
                <div className="h-2 bg-terminal-border/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-terminal-primary rounded-full"
                    style={{ width: `${skill.level}%`, transition: 'width 1s ease-in-out' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-terminal-muted text-sm italic">
        <p>* Proficiency levels are subjective self-assessments based on experience and comfort with each technology.</p>
      </div>
    </div>
  );
};

export default VimSkills;
