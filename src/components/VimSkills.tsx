import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Code, Database, Palette, File } from 'lucide-react';
import SkillCard from './SkillCard';
import { JavaScriptIcon, TypeScriptIcon, ReactIcon, NodeIcon, PythonIcon, PostgresIcon, FigmaIcon, Laptop } from './TechIcons';

interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  years: number;
  icon: string;
}

interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    JavaScript: <JavaScriptIcon />,
    TypeScript: <TypeScriptIcon />,
    React: <ReactIcon />,
    Node: <NodeIcon />,
    Python: <PythonIcon />,
    Postgres: <PostgresIcon />,
    Figma: <FigmaIcon />,
    Laptop: <Laptop className="h-4 w-4 text-blue-400" />
  };
  return icons[iconName];
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Frontend Development":
      return <Code size={18} className="text-terminal-primary" />;
    case "Backend Development":
      return <Database size={18} className="text-terminal-primary" />;
    case "UI/UX Design":
      return <Palette size={18} className="text-terminal-primary" />;
    default:
      return <Code size={18} className="text-terminal-primary" />;
  }
};

async function fetchSkills(): Promise<SkillCategory[]> {
  try {
    const response = await fetch('/src/data/skills.md');
    const text = await response.text();
    
    const categories: SkillCategory[] = [];
    const sections = text.split('## ').slice(1);
    
    sections.forEach(section => {
      const lines = section.trim().split('\n');
      const category = lines[0];
      const skills: Skill[] = [];
      
      lines.slice(1).forEach(line => {
        if (line.trim()) {
          const [name, level, years, icon] = line.split(',');
          skills.push({
            name,
            level: level as "Expert" | "Advanced" | "Intermediate",
            years: parseInt(years),
            icon
          });
        }
      });
      
      categories.push({
        category,
        icon: getCategoryIcon(category),
        skills
      });
    });
    
    return categories;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

const VimTerminalSkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchSkills().then(setSkillCategories);
  }, []);

  if (skillCategories.length === 0) {
    return <div className="text-terminal-info">Loading...</div>;
  }

  return (
    <div className="vim-skills animate-fade-in">
      <div className="flex flex-wrap gap-0 mb-6">
        {skillCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 flex items-center gap-2 text-sm transition-colors relative ${
              activeTab === index 
                ? 'bg-terminal-border text-terminal-foreground border-x border-t border-terminal-border/40 rounded-t-md z-10' 
                : 'bg-terminal-background text-terminal-muted border-b border-terminal-border/40 hover:text-terminal-foreground'
            }`}
          >
            <File size={14} className={activeTab === index ? 'text-terminal-accent' : 'text-terminal-muted'} />
            <span>{isMobile ? category.category.split(' ')[0] : category.category}</span>
          </button>
        ))}
        <div className="flex-grow border-b border-terminal-border/40" />
      </div>

      <div className="bg-terminal-border/10 rounded-md border border-terminal-border/20 overflow-hidden">
        {skillCategories[activeTab]?.skills.map((skill, index) => (
          <SkillCard
            key={index}
            name={skill.name}
            level={skill.level}
            years={skill.years}
            icon={getIconComponent(skill.icon)}
            lineNumber={index + 1}
          />
        ))}
      </div>

      <div className="text-terminal-muted text-sm italic mt-4">
        <p>* Skill levels and years of experience are based on professional work and personal projects.</p>
      </div>
    </div>
  );
};

export default VimTerminalSkills;
