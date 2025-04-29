
import React, { useState, useEffect } from 'react';
import { Briefcase, Github } from 'lucide-react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Project {
  id: string;
  title: string;
  description: string;
  repo: string;
  liveDemo?: string;
  technologies: string[];
}

async function fetchProjects(): Promise<Project[]> {
  try {
    // Updated path to correctly access the file in production
    const response = await fetch('/data/projects.md');
    const text = await response.text();
    
    const projects: Project[] = [];
    const sections = text.split('## ').slice(1); // Skip the header
    
    sections.forEach((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0];
      const description = lines[1];
      const repo = lines[2];
      const liveDemo = lines[3];
      const technologies = lines[4].split(', ');
      
      projects.push({
        id: String(index),
        title,
        description,
        repo,
        liveDemo,
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProjects()
      .then((fetchedProjects) => {
        setProjects(fetchedProjects);
        // Select the first project by default
        if (fetchedProjects.length > 0) {
          setSelectedProject(fetchedProjects[0]);
        }
      })
      .catch(() => setError("Failed to load projects"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-terminal-info">Loading...</div>;
  if (error) return <div className="text-terminal-error">{error}</div>;

  return (
    <div className="vim-projects animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Briefcase className="text-terminal-secondary" />
        <h2 className="text-stone-300 text-xl font-semibold">Recent Experiments</h2>
      </div>

      <ResizablePanelGroup direction="horizontal">
        {/* Left Panel - Project List */}
        <ResizablePanel defaultSize={40}>
          <ScrollArea className="h-[600px]">
            <div className="border-r border-terminal-border">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`px-3 py-2 cursor-pointer transition-colors border-l-2 ${
                    selectedProject?.id === project.id
                      ? 'bg-terminal-primary/10 border-terminal-primary text-terminal-primary text-opacity-70'
                      : 'border-transparent hover:bg-terminal-border/10'
                  }`}
                >
                  <h3 className="text-sm font-medium">{project.title}</h3>
                </div>
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>

        {/* Resizable Handle */}
        <ResizableHandle withHandle />

        {/* Right Panel - Project Details */}
        <ResizablePanel defaultSize={60}>
          <ScrollArea className="h-[600px]">
            <div className="p-6">
              {selectedProject ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-teal-400 mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-stone-300">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-terminal-accent mb-2">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-terminal-border/30 text-stone-400 rounded-md text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      {selectedProject.repo && (
                        <a
                          href={selectedProject.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-terminal-accent hover:underline"
                        >
                          <Github size={16} />
                          <span>View Source</span>
                        </a>
                      )}
                      {selectedProject.liveDemo && (
                        <a
                          href={selectedProject.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-terminal-accent hover:underline"
                        >
                          <span>🌐</span>
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-terminal-muted text-center pt-10">
                  Select a project to view details
                </div>
              )}
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default VimProjects;
