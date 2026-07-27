
import React, { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import { Calendar1 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  url: string;
  created: string;
}

interface BlogYear {
  year: string;
  posts: BlogPost[];
}

const hardcodedBlogs: BlogPost[] = [
  {
    id: "1",
    title: "The AI Parddadox",
    url: "https://engineersmeetai.substack.com/p/the-ai-paradox",
    created: "2025-04"
  },
  {
    id: "2",
    title: "How the Priming Effect Shapes Engineers: The Hidden Biases in Our Decisions",
    url: "https://engineersmeetai.substack.com/p/how-the-priming-effect-shapes-engineers",
    created: "2025-03"
  },
  {
    id: "3",
    title: "How WebAssembly is reshaping Data & AI",
    url: "https://engineersmeetai.substack.com/p/the-wasm-edge-how-webassembly-is",
    created: "2025-03"
  },
  {
    id: "4",
    title: "LLMAnalytics: Beyond Clicks and Views",
    url: "https://engineersmeetai.substack.com/p/llmanalytics-beyond-clicks-and-views",
    created: "2025-03"
  },
  {
    id: "5",
    title: "Engineering Challenges in Building NLP-Driven UI/UX [ Podcast Enabled ]",
    url: "https://engineersmeetai.substack.com/p/engineering-challenges-in-building",
    created: "2025-03"
  },
  {
    id: "6",
    title: "Why Pi-Shaped Engineering Teams Matter in This AI Era",
    url: "https://engineersmeetai.substack.com/p/are-you-building-pi-shaped-teams",
    created: "2025-03"
  },
  {
    id: "7",
    title: "Think in Shapes: A Quick Visual Guide for Engineers",
    url: "https://engineersmeetai.substack.com/p/think-in-shapes-a-visual-guide-for",
    created: "2025-02"
  },
  {
    id: "8",
    title: "How to Pick the Right Tech for Your Startup",
    url: "https://engineersmeetai.substack.com/p/how-to-pick-the-right-tech-for-your",
    created: "2025-02"
  },
  {
    id: "9",
    title: "Service, Handlers and Controllers - Explained",
    url: "https://engineersmeetai.substack.com/p/service-handlers-controllers-in-go",
    created: "2023-02"
  },
  {
    id: "10",
    title: "Decades of Data Roles: My Journey to ML Engineer",
    url: "https://engineersmeetai.substack.com/p/decades-of-data-my-journey-from-data",
    created: "2019-12"
  }
];

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/data/blogs.md');
    if (!response.ok) return hardcodedBlogs;
    const text = await response.text();
    const posts: BlogPost[] = [];
    const sections = text.split('## ').slice(1);
    sections.forEach((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0];
      const date = lines[1];
      const url = lines.find(line => line.startsWith('http')) || '';
      posts.push({ id: String(index), title, url, created: date });
    });
    return posts;
  } catch {
    return hardcodedBlogs;
  }
}

function groupPostsByYear(posts: BlogPost[]): BlogYear[] {
  const yearMap: Record<string, BlogPost[]> = {};
  posts.forEach(post => {
    const year = post.created.split('-')[0];
    if (!yearMap[year]) yearMap[year] = [];
    yearMap[year].push(post);
  });
  return Object.entries(yearMap)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, yearPosts]) => ({
      year,
      posts: yearPosts.sort((a, b) => b.created.localeCompare(a.created))
    }));
}

const VimBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const years = useMemo(() => groupPostsByYear(posts), [posts]);
  const selectedYearPosts = years[activeTab]?.posts || [];

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        event_category: 'Content',
        event_label: 'Blog Section',
        content_type: 'blog'
      });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchBlogPosts()
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => { setPosts(hardcodedBlogs); setError("Failed to load blog posts"); setLoading(false); });
  }, []);

  if (loading) {
    return <div className="text-terminal-info">Loading...</div>;
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-lg font-bold text-terminal-accent mb-4">Latest Blog Posts</h2>

      {error && <div className="text-terminal-error mb-4">{error}</div>}

      <div className="flex flex-wrap gap-0 mb-6">
        {years.map((yearGroup, index) => (
          <button
            key={yearGroup.year}
            onClick={() => setActiveTab(index)}
              className={`px-4 py-2 flex items-center gap-2 text-sm transition-colors relative group ${
                activeTab === index
                  ? 'bg-terminal-tab-active-bg text-terminal-tab-active-text border-x border-t border-terminal-border/40 rounded-t-md z-10'
                  : 'bg-terminal-background text-terminal-tab-inactive-text border-b border-terminal-border/40 hover:text-terminal-foreground'
              }`}
          >
            <Calendar1 size={14} className={activeTab === index ? 'text-terminal-tab-active-text' : 'text-terminal-tab-inactive-text'} />
            <span>{yearGroup.year}</span>
            <span className="text-xs opacity-50">({yearGroup.posts.length})</span>
          </button>
        ))}
        <div className="flex-grow border-b border-terminal-border/40" />
      </div>

      <div className="bg-terminal-border/10 rounded-md border border-terminal-border/20 overflow-hidden">
        <ul className="space-y-0">
          {selectedYearPosts.map(post => (
            <li key={post.id} className="flex items-center gap-2 px-4 py-2 border-b border-terminal-border/10 last:border-b-0 hover:bg-terminal-border/5 transition-colors whitespace-nowrap">
              <span className="text-terminal-muted flex-shrink-0">
                {format(new Date(post.created), "MMM yyyy")}:
              </span>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-foreground hover:text-terminal-accent transition-colors truncate"
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-terminal-muted text-sm italic mt-4">
        <p>* Blog posts from EngineersMeetAI Substack</p>
      </div>
    </div>
  );
};

export default VimBlog;
