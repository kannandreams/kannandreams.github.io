
import React, { useState, useEffect } from 'react';
import { Briefcase, ExternalLink, Code, Calendar } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  repo: string;
  technologies: string[];
}

async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/src/data/projects.md');
    const text = await response.text();
    
    const projects: Project[] = [];
    const sections = text.split('## ').slice(1); // Skip the header
    
    sections.forEach((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0];
      const date = lines[1];
      const description = lines[2];
      const repo = lines[3];
      const technologies = lines[4].split(', ');
      
      projects.push({
        id: String(index),
        title,
        date,
        description,
        repo,
        technologies,
      });
    });
    
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

const VimProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProjects()
      .then(setProjects)
      .catch(() => setError("Failed to load projects"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="vim-projects animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Briefcase className="text-terminal-secondary" />
        <h2 className="text-terminal-accent text-xl font-semibold">Recent Side Projects</h2>
      </div>

      {loading ? (
        <div className="text-terminal-info">Loading...</div>
      ) : error ? (
        <div className="text-terminal-error">{error}</div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`
                p-4 rounded-md transition-all duration-300 cursor-pointer
                ${activeProject === index ? 'bg-terminal-border/40' : 'bg-terminal-border/10 hover:bg-terminal-border/20'}
                ${index === 0 ? 'border-l-2 border-terminal-accent' : ''}
              `}
              onClick={() => setActiveProject(activeProject === index ? null : index)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-terminal-primary font-medium">{project.title}</h3>
                
                <div className="flex items-center space-x-3 text-terminal-muted text-sm mt-2 md:mt-0">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {project.date}
                  </span>
                  
                  <a 
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-terminal-accent hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Code size={14} className="mr-1" />
                    Code
                  </a>
                </div>
              </div>
              
              {activeProject === index && (
                <div className="mt-3 animate-slide-up">
                  <p className="text-terminal-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-terminal-border/30 text-terminal-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="text-terminal-muted text-sm italic mt-6">
        <p>Click on a project to expand/collapse details.</p>
      </div>
    </div>
  );
};

export default VimProjects;
