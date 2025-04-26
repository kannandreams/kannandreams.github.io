
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Code, Database, Palette, File, X } from 'lucide-react';
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
  comment?: string | null;
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
    Laptop: <Laptop className="h-4 w-4 text-blue-400" />,
    Snowflake: <Database className="h-4 w-4 text-blue-400" />,
    DBT: <Database className="h-4 w-4 text-blue-400" />,
    Spark: <Database className="h-4 w-4 text-orange-400" />,
    Oracle: <Database className="h-4 w-4 text-red-400" />,
    FastAPI: <Code className="h-4 w-4 text-green-400" />,
    AWS: <Code className="h-4 w-4 text-yellow-400" />,
    Docker: <Code className="h-4 w-4 text-blue-400" />,
    Github: <Code className="h-4 w-4 text-purple-400" />,
    Terraform: <Code className="h-4 w-4 text-indigo-400" />,
    Jenkins: <Code className="h-4 w-4 text-red-400" />,
    Google: <Code className="h-4 w-4 text-blue-500" />,
    Hadoop: <Database className="h-4 w-4 text-yellow-500" />,
    Java: <Code className="h-4 w-4 text-red-500" />,
    Rust: <Code className="h-4 w-4 text-orange-600" />,
    Next: <Code className="h-4 w-4 text-black" />
  };
  return icons[iconName] || <Code className="h-4 w-4 text-gray-400" />;
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Frontend Development":
      return <Code size={18} className="text-terminal-primary" />;
    case "Backend Development":
      return <Database size={18} className="text-terminal-primary" />;
    case "UI/UX Design":
      return <Palette size={18} className="text-terminal-primary" />;
    case "Data & Machine Learning":
      return <Database size={18} className="text-terminal-primary" />;
    case "Software Engineering":
      return <Code size={18} className="text-terminal-primary" />;
    case "Platform Engineering":
      return <Code size={18} className="text-terminal-primary" />;
    default:
      return <Code size={18} className="text-terminal-primary" />;
  }
};

const hardcodedSkills: SkillCategory[] = [
  {
    category: "Data & Machine Learning",
    icon: <Database size={18} className="text-terminal-primary" />,
    skills: [
      {
        name: "Snowflake",
        level: "Advanced",
        years: 5,
        icon: "Snowflake"
      },
      {
        name: "DBT",
        level: "Expert",
        years: 5,
        icon: "DBT"
      },
      {
        name: "Spark",
        level: "Advanced",
        years: 10,
        icon: "Spark"
      },
      {
        name: "Kafka",
        level: "Advanced",
        years: 10,
        icon: "Spark"
      }
    ]
  },
  {
    category: "Software Engineering",
    icon: <Code size={18} className="text-terminal-primary" />,
    skills: [
      {
        name: "Python",
        level: "Expert",
        years: 15,
        icon: "Python"
      },
      {
        name: "SQL",
        level: "Expert",
        years: 15,
        icon: "Oracle"
      },
      {
        name: "React",
        level: "Intermediate",
        years: 2,
        icon: "React"
      },
      {
        name: "FastAPI",
        level: "Expert",
        years: 4,
        icon: "FastAPI"
      }
    ]
  },
  {
    category: "Platform Engineering",
    icon: <Code size={18} className="text-terminal-primary" />,
    skills: [
      {
        name: "AWS",
        level: "Advanced",
        years: 10,
        icon: "AWS"
      },
      {
        name: "Containerization",
        level: "Advanced",
        years: 10,
        icon: "Docker"
      },
      {
        name: "GitOps",
        level: "Advanced",
        years: 10,
        icon: "Github"
      },
      {
        name: "Terraform",
        level: "Advanced",
        years: 5,
        icon: "Terraform"
      },
      {
        name: "CI/CD",
        level: "Advanced",
        years: 10,
        icon: "Jenkins"
      }
    ]
  }
];

async function fetchSkills(): Promise<SkillCategory[]> {
  try {
    const response = await fetch('/data/skills.md');
    if (!response.ok) {
      throw new Error('Failed to fetch skills data');
    }
    
    const text = await response.text();
    const categories: SkillCategory[] = [];
    
    const sections = text.split('\n## ').slice(1);
    
    sections.forEach(section => {
      const lines = section.trim().split('\n');
      const category = lines[0].trim();
      
      const commentLineIndex = lines.findIndex(line => line.startsWith('###'));
      const comment = commentLineIndex !== -1 
        ? lines[commentLineIndex].replace('###', '').trim()
        : null;
      
      const skills: Skill[] = [];
      
      lines.slice(commentLineIndex + 1).forEach(line => {
        if (line.trim() && !line.startsWith('#')) {
          const [name, level, years, icon] = line.split(',');
          if (name && level && icon) {
            skills.push({
              name,
              level: level as "Expert" | "Advanced" | "Intermediate",
              years: parseInt(years || '0'),
              icon
            });
          }
        }
      });
      
      categories.push({
        category,
        icon: getCategoryIcon(category),
        skills,
        comment
      });
    });
    
    return categories;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return hardcodedSkills;
  }
}

const VimTerminalSkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    setLoading(true);
    fetchSkills()
      .then(data => {
        setSkillCategories(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error setting skills:', error);
        setSkillCategories(hardcodedSkills);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-terminal-info">Loading...</div>;
  }

  return (
    <div className="vim-skills animate-fade-in">
      <div className="flex flex-wrap gap-0 mb-6">
        {skillCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 flex items-center gap-2 text-sm transition-colors relative group ${
              activeTab === index 
                ? 'bg-terminal-border text-terminal-foreground border-x border-t border-terminal-border/40 rounded-t-md z-10' 
                : 'bg-terminal-background text-terminal-muted border-b border-terminal-border/40 hover:text-terminal-foreground'
            }`}
          >
            <File size={14} className={activeTab === index ? 'text-terminal-accent' : 'text-terminal-muted'} />
            <span>{isMobile ? category.category.split(' ')[0] : category.category}</span>
            <X 
              size={12} 
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-terminal-muted hover:text-terminal-foreground" 
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </button>
        ))}
        <div className="flex-grow border-b border-terminal-border/40" />
      </div>

      <div className="bg-terminal-border/10 rounded-md border border-terminal-border/20 overflow-hidden">
        {skillCategories[activeTab]?.comment && (
          <div className="text-[#8E9196] text-sm italic pl-12 py-2 border-b border-terminal-border/20">
            // {skillCategories[activeTab].comment}
          </div>
        )}
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
