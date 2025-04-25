
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Code, Database, Palette } from 'lucide-react';
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

const VimSkills: React.FC = () => {
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
      <div className="flex items-center space-x-2 mb-6">
        {skillCategories[activeTab]?.icon}
        <h2 className="text-terminal-accent text-xl font-semibold">
          {skillCategories[activeTab]?.category}
        </h2>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {skillCategories.map((category, index) => (
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
      </div>

      <div className="text-terminal-muted text-sm italic">
        <p>* Skill levels and years of experience are based on professional work and personal projects.</p>
      </div>
    </div>
  );
};

export default VimSkills;
