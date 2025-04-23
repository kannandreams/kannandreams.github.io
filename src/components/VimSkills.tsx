import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Code, Database, Settings, Laptop, Palette } from 'lucide-react';
import SkillCard from './SkillCard';
import { JavaScriptIcon, TypeScriptIcon, ReactIcon, NodeIcon, PythonIcon, PostgresIcon, FigmaIcon } from './TechIcons';

const skillsData = [
  {
    category: 'Frontend Development',
    icon: <Code size={18} className="text-terminal-primary" />,
    skills: [
      { name: 'JavaScript', level: "Expert", years: 5, icon: <JavaScriptIcon /> },
      { name: 'TypeScript', level: "Expert", years: 4, icon: <TypeScriptIcon /> },
      { name: 'React', level: "Expert", years: 4, icon: <ReactIcon /> },
      { name: 'Vue.js', level: "Advanced", years: 2, icon: <ReactIcon /> },
    ]
  },
  {
    category: 'Backend Development',
    icon: <Database size={18} className="text-terminal-primary" />,
    skills: [
      { name: 'Node.js', level: "Expert", years: 4, icon: <NodeIcon /> },
      { name: 'Python', level: "Advanced", years: 3, icon: <PythonIcon /> },
      { name: 'PostgreSQL', level: "Advanced", years: 3, icon: <PostgresIcon /> },
    ]
  },
  {
    category: 'UI/UX Design',
    icon: <Palette size={18} className="text-terminal-primary" />,
    skills: [
      { name: 'Figma', level: "Expert", years: 3, icon: <FigmaIcon /> },
      { name: 'Responsive Design', level: "Expert", years: 5, icon: <Laptop className="h-4 w-4 text-blue-400" /> },
    ]
  },
] as const;

const VimSkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useIsMobile();

  return (
    <div className="vim-skills animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        {skillsData[activeTab].icon}
        <h2 className="text-terminal-accent text-xl font-semibold">
          {skillsData[activeTab].category}
        </h2>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillsData[activeTab].skills.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              level={skill.level}
              years={skill.years}
              icon={skill.icon}
            />
          ))}
        </div>
      </div>

      <div className="text-terminal-muted text-sm italic">
        <p>* Skill levels and years of experience are based on professional work and personal projects.</p>
      </div>
    </div>
  );
};

export default VimSkills;
