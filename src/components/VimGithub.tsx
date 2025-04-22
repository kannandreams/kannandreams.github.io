
import React, { useState } from 'react';
import { Github, GitCommit, GitBranch, GitPullRequest, Star } from 'lucide-react';

// Mock GitHub data
const githubData = {
  user: 'github_username',
  repos: 24,
  stars: 152,
  followers: 87,
  following: 64,
  totalCommits: 1538,
  
  commitActivity: [
    // Last 12 weeks of commit activity (count per week)
    { week: '12 weeks ago', count: 23 },
    { week: '11 weeks ago', count: 17 },
    { week: '10 weeks ago', count: 34 },
    { week: '9 weeks ago', count: 22 },
    { week: '8 weeks ago', count: 19 },
    { week: '7 weeks ago', count: 45 },
    { week: '6 weeks ago', count: 29 },
    { week: '5 weeks ago', count: 31 },
    { week: '4 weeks ago', count: 26 },
    { week: '3 weeks ago', count: 38 },
    { week: '2 weeks ago', count: 42 },
    { week: '1 week ago', count: 37 },
  ],
  
  topRepos: [
    {
      name: 'vim-portfolio',
      stars: 48,
      forks: 12,
      description: 'A vim-inspired terminal portfolio website',
      language: 'TypeScript'
    },
    {
      name: 'project-dashboard',
      stars: 36,
      forks: 8,
      description: 'Project management dashboard with analytics',
      language: 'JavaScript'
    },
    {
      name: 'api-toolkit',
      stars: 29,
      forks: 6,
      description: 'Useful utilities for API development',
      language: 'Python'
    },
    {
      name: 'react-components',
      stars: 24,
      forks: 7,
      description: 'Collection of reusable React components',
      language: 'TypeScript'
    },
  ],
  
  recentActivity: [
    { type: 'commit', repo: 'vim-portfolio', message: 'Add terminal prompt animation', date: '2 days ago' },
    { type: 'PR', repo: 'open-source-project', message: 'Fix accessibility issues', date: '5 days ago' },
    { type: 'issue', repo: 'api-toolkit', message: 'Add rate limiting feature', date: '1 week ago' },
    { type: 'commit', repo: 'vim-portfolio', message: 'Implement vim keybindings', date: '1 week ago' },
    { type: 'PR', repo: 'community-project', message: 'Add dark theme', date: '2 weeks ago' },
  ]
};

// Language color mapping
const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
};

const VimGithub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'commits' | 'repos' | 'activity'>('overview');
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return <GitCommit size={14} />;
      case 'PR':
        return <GitPullRequest size={14} />;
      case 'issue':
        return <GitBranch size={14} />;
      default:
        return <GitCommit size={14} />;
    }
  };

  return (
    <div className="vim-github animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Github className="text-terminal-secondary" />
        <h2 className="text-terminal-accent text-xl font-semibold">GitHub Stats</h2>
      </div>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'overview' 
              ? 'bg-terminal-border text-terminal-foreground' 
              : 'bg-terminal-background hover:bg-terminal-border/30 text-terminal-muted'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('commits')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'commits' 
              ? 'bg-terminal-border text-terminal-foreground' 
              : 'bg-terminal-background hover:bg-terminal-border/30 text-terminal-muted'
          }`}
        >
          Commit Activity
        </button>
        <button
          onClick={() => setActiveTab('repos')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'repos' 
              ? 'bg-terminal-border text-terminal-foreground' 
              : 'bg-terminal-background hover:bg-terminal-border/30 text-terminal-muted'
          }`}
        >
          Top Repositories
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'activity' 
              ? 'bg-terminal-border text-terminal-foreground' 
              : 'bg-terminal-background hover:bg-terminal-border/30 text-terminal-muted'
          }`}
        >
          Recent Activity
        </button>
      </div>
      
      {/* Content based on active tab */}
      <div className="bg-terminal-border/20 rounded-md p-4">
        {activeTab === 'overview' && (
          <div className="overview animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-terminal-border/30 rounded-md p-3 text-center">
                <div className="text-terminal-accent text-2xl font-semibold">{githubData.repos}</div>
                <div className="text-terminal-muted text-sm">Repositories</div>
              </div>
              <div className="bg-terminal-border/30 rounded-md p-3 text-center">
                <div className="text-terminal-accent text-2xl font-semibold">{githubData.stars}</div>
                <div className="text-terminal-muted text-sm">Stars</div>
              </div>
              <div className="bg-terminal-border/30 rounded-md p-3 text-center">
                <div className="text-terminal-accent text-2xl font-semibold">{githubData.followers}</div>
                <div className="text-terminal-muted text-sm">Followers</div>
              </div>
              <div className="bg-terminal-border/30 rounded-md p-3 text-center">
                <div className="text-terminal-accent text-2xl font-semibold">{githubData.totalCommits}</div>
                <div className="text-terminal-muted text-sm">Total Commits</div>
              </div>
            </div>
            
            <div className="text-terminal-foreground mb-4">
              <p className="mb-2">GitHub Username: <span className="text-terminal-primary">@{githubData.user}</span></p>
              <p>View complete profile at <a href={`https://github.com/${githubData.user}`} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline">github.com/{githubData.user}</a></p>
            </div>
          </div>
        )}
        
        {activeTab === 'commits' && (
          <div className="commits animate-fade-in">
            <h3 className="text-terminal-primary text-lg mb-4">Commit Activity (Last 12 Weeks)</h3>
            
            <div className="commit-graph space-y-2">
              {githubData.commitActivity.map((week, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-24 text-xs text-terminal-muted text-right pr-2">{week.week}</div>
                  <div className="flex-1 h-6 bg-terminal-border/20 rounded-sm relative">
                    <div 
                      className="absolute top-0 left-0 h-full bg-terminal-primary rounded-sm"
                      style={{ width: `${(week.count / 50) * 100}%` }}
                    ></div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs">
                      {week.count} commits
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center text-terminal-muted">
              <p>Total Lifetime Commits: <span className="text-terminal-accent">{githubData.totalCommits}</span></p>
            </div>
          </div>
        )}
        
        {activeTab === 'repos' && (
          <div className="repos animate-fade-in">
            <h3 className="text-terminal-primary text-lg mb-4">Top Repositories</h3>
            
            <div className="space-y-4">
              {githubData.topRepos.map((repo, index) => (
                <div key={index} className="bg-terminal-border/10 p-3 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <a href={`https://github.com/${githubData.user}/${repo.name}`} target="_blank" rel="noopener noreferrer" className="text-terminal-accent font-medium hover:underline">
                      {repo.name}
                    </a>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center text-terminal-muted text-sm">
                        <Star size={14} className="mr-1" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center text-terminal-muted text-sm">
                        <GitBranch size={14} className="mr-1" />
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-terminal-foreground text-sm mb-2">{repo.description}</p>
                  
                  <div className="flex items-center">
                    <span 
                      className="w-3 h-3 rounded-full mr-1.5"
                      style={{ backgroundColor: languageColors[repo.language] || '#ccc' }}
                    ></span>
                    <span className="text-terminal-muted text-xs">{repo.language}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'activity' && (
          <div className="activity animate-fade-in">
            <h3 className="text-terminal-primary text-lg mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {githubData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-1 mr-3 text-terminal-accent">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <div className="text-terminal-foreground">
                      <span className="text-terminal-primary">{activity.type === 'PR' ? 'Pull Request' : activity.type === 'issue' ? 'Issue' : 'Commit'}</span>
                      {' '}in <span className="text-terminal-accent">{activity.repo}</span>: 
                      {' '}{activity.message}
                    </div>
                    <div className="text-terminal-muted text-xs mt-1">{activity.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="text-terminal-muted text-sm italic mt-4">
        <p>* GitHub data is simulated for demonstration purposes</p>
      </div>
    </div>
  );
};

export default VimGithub;
