
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  url: string;
  created: string;
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/src/data/blogs.md');
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
    return [];
  }
}

const VimBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchBlogPosts()
      .then(setPosts)
      .catch(() => setError("Failed to load blog posts"))
      .finally(() => setLoading(false));
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

