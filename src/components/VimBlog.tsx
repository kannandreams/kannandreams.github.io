
import React, { useEffect, useState } from "react";
interface BlogPost {
  id: string;
  title: string;
  url: string;
  created: string;
}
const SUBSTACK_FEED = "https://your-substack-url.substack.com/feed"; // Replace with your Substack RSS feed

// Very simple RSS to JSON fetch/parse
async function fetchSubstackPosts(): Promise<BlogPost[]> {
  // Free third-party API! (Substack doesn't support CORS on RSS so we must use a proxy)
  const API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_FEED)}`;
  const resp = await fetch(API);
  const data = await resp.json();
  if (!data || !data.items) return [];
  return data.items.slice(0, 5).map((item: any, idx: number) => ({
    id: String(idx),
    title: item.title,
    url: item.link,
    created: item.pubDate,
  }));
}

const VimBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchSubstackPosts()
      .then(setPosts)
      .catch(() => setError("Failed to load blog posts"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in">
      <h2 className="text-lg font-bold mb-2 text-terminal-accent">Latest Blog Posts</h2>
      {loading ? (
        <div className="text-terminal-info">Loading...</div>
      ) : error ? (
        <div className="text-terminal-error">{error}</div>
      ) : (
        <ul className="space-y-2">
          {posts.map(post => (
            <li key={post.id}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-terminal-secondary font-medium"
              >
                {post.title}
              </a>
              <span className="ml-2 text-xs text-terminal-muted">{new Date(post.created).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <a
          href="https://your-substack-url.substack.com"
          target="_blank"
          className="text-terminal-accent underline"
          rel="noopener noreferrer"
        >
          See all posts on Substack
        </a>
      </div>
    </div>
  );
};

export default VimBlog;
