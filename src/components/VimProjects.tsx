
import React, { useState } from 'react';
import { Briefcase, ExternalLink, Code, Calendar } from 'lucide-react';

// Project data
const projectsData = [
  {
    title: 'Vim Portfolio Terminal',
    description: 'A terminal-based portfolio website with Vim-inspired navigation and commands. Built with React and TypeScript.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    link: '#',
    repo: 'https://github.com/yourusername/vim-portfolio',
    date: 'April 2025',
    highlight: true
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    link: 'https://example-ecommerce.com',
    repo: 'https://github.com/yourusername/ecommerce',
    date: 'December 2024',
  },
  {
    title: 'Project Management Dashboard',
    description: 'A dashboard for tracking projects, tasks, and team performance with real-time updates.',
    technologies: ['Vue.js', 'Firebase', 'Vuex', 'Chart.js'],
    link: 'https://project-dashboard.example.com',
    repo: 'https://github.com/yourusername/project-dashboard',
    date: 'October 2024',
  },
  {
    title: 'AI Content Analyzer',
    description: 'Tool that uses machine learning to analyze and categorize content from various sources.',
    technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
    link: 'https://ai-analyzer.example.com',
    repo: 'https://github.com/yourusername/ai-analyzer',
    date: 'August 2024',
  },
  {
    title: 'Health Tracking Mobile App',
    description: 'Cross-platform mobile application for tracking health metrics, exercise, and nutrition.',
    technologies: ['React Native', 'Redux', 'Firebase', 'HealthKit/Google Fit APIs'],
    link: 'https://health-app.example.com',
    repo: 'https://github.com/yourusername/health-tracker',
    date: 'May 2024',
  },
];

const VimProjects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div className="vim-projects animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Briefcase className="text-terminal-secondary" />
        <h2 className="text-terminal-accent text-xl font-semibold">Portfolio Projects</h2>
      </div>

      <div className="space-y-4">
        {projectsData.map((project, index) => (
          <div 
            key={index}
            className={`
              p-4 rounded-md transition-all duration-300 cursor-pointer
              ${activeProject === index ? 'bg-terminal-border/40' : 'bg-terminal-border/10 hover:bg-terminal-border/20'}
              ${project.highlight ? 'border-l-2 border-terminal-accent' : ''}
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
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-terminal-accent hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} className="mr-1" />
                  Demo
                </a>
                
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

      <div className="text-terminal-muted text-sm italic mt-6">
        <p>Click on a project to expand/collapse details.</p>
      </div>
    </div>
  );
};

export default VimProjects;
