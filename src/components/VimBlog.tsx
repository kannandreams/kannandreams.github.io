
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  url: string;
  created: string;
}

// Hardcoded blog data as fallback
const hardcodedBlogs: BlogPost[] = [
  {
    id: "1",
    title: "The AI Paradox",
    url: "https://eggpuffengineer.substack.com/p/the-ai-paradox",
    created: "2025-04"
  },
  {
    id: "2",
    title: "How the Priming Effect Shapes Engineers: The Hidden Biases in Our Decisions",
    url: "https://eggpuffengineer.substack.com/p/how-the-priming-effect-shapes-engineers",
    created: "2025-03"
  },
  {
    id: "3",
    title: "How WebAssembly is reshaping Data & AI",
    url: "https://eggpuffengineer.substack.com/p/the-wasm-edge-how-webassembly-is",
    created: "2025-03"
  },
  {
    id: "4",
    title: "LLMAnalytics: Beyond Clicks and Views",
    url: "https://eggpuffengineer.substack.com/p/llmanalytics-beyond-clicks-and-views",
    created: "2025-03"
  },
  {
    id: "5",
    title: "Engineering Challenges in Building NLP-Driven UI/UX [ Podcast Enabled ]",
    url: "https://eggpuffengineer.substack.com/p/engineering-challenges-in-building",
    created: "2025-03"
  },
  {
    id: "6",
    title: "Why Pi-Shaped Engineering Teams Matter in This AI Era",
    url: "https://eggpuffengineer.substack.com/p/are-you-building-pi-shaped-teams",
    created: "2025-03"
  },
  {
    id: "7",
    title: "Think in Shapes: A Quick Visual Guide for Engineers",
    url: "https://eggpuffengineer.substack.com/p/think-in-shapes-a-visual-guide-for",
    created: "2025-02"
  },
  {
    id: "8",
    title: "How to Pick the Right Tech for Your Startup",
    url: "https://eggpuffengineer.substack.com/p/how-to-pick-the-right-tech-for-your",
    created: "2025-02"
  },
  {
    id: "9",
    title: "Service, Handlers and Controllers - Explained",
    url: "https://eggpuffengineer.substack.com/p/service-handlers-controllers-in-go",
    created: "2023-02"
  },
  {
    id: "10",
    title: "Decades of Data Roles: My Journey to ML Engineer",
    url: "https://eggpuffengineer.substack.com/p/decades-of-data-my-journey-from-data",
    created: "2019-12"
  }
];

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/src/data/blogs.md');
    if (!response.ok) {
      console.log('Using hardcoded blog data');
      return hardcodedBlogs;
    }
    
    const text = await response.text();
    
    const posts: BlogPost[] = [];
    const sections = text.split('## ').slice(1); // Skip the header
    
    sections.forEach((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0];
      const date = lines[1];
      const url = lines[3];
      
      posts.push({
        id: String(index),
        title,
        url,
        created: date
      });
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return hardcodedBlogs;
  }
}

const VimBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchBlogPosts()
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load blogs:', err);
        setPosts(hardcodedBlogs);
        setError("Failed to load blog posts");
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade-in">
      <h2 className="text-lg font-bold text-terminal-accent mb-4">Latest Blog Posts</h2>

      {loading ? (
        <div className="text-terminal-info">Loading...</div>
      ) : error ? (
        <div className="text-terminal-error">{error}</div>
      ) : (
        <ul className="space-y-3">
          {posts.map(post => (
            <li key={post.id} className="flex items-baseline gap-2">
              <span className="text-terminal-muted">
                {format(new Date(post.created), "MMM yyyy")}:
              </span>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-terminal-accent transition-colors"
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VimBlog;
