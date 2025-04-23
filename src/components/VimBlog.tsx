import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { RssIcon } from "lucide-react";

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
    
    // Parse the markdown content
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
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          asChild
        >
          <a
            href="https://your-substack-url.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-accent hover:text-terminal-accent/90"
          >
            <RssIcon className="h-4 w-4" />
            Subscribe
          </a>
        </Button>
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
                    {new Date(post.created).toLocaleDateString()}
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
