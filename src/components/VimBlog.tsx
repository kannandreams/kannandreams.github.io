
import React, { useEffect, useState } from "react";
import SubscribeButton from "./blog/SubscribeButton";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  url: string;
  created: string;
  excerpt?: string;
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
      const excerpt = lines[2];
      
      posts.push({
        id: String(index),
        title,
        url,
        created: date,
        excerpt
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-terminal-accent">Latest Blog Posts</h2>
        <SubscribeButton />
      </div>

      {loading ? (
        <div className="text-terminal-info">Loading...</div>
      ) : error ? (
        <div className="text-terminal-error">{error}</div>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.id} className="border-b border-terminal-border pb-4 last:border-0">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <h3 className="text-terminal-foreground font-medium group-hover:text-terminal-accent transition-colors">
                  {post.title}
                </h3>
                <div className="mt-1 text-terminal-muted text-sm flex items-center gap-2">
                  <time dateTime={post.created}>
                    {format(new Date(post.created), "MMMM yyyy")}
                  </time>
                </div>
                {post.excerpt && (
                  <p className="mt-2 text-terminal-muted text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VimBlog;
