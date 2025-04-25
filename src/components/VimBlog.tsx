
import React, { useEffect, useState } from "react";
import SubscribeButton from "./blog/SubscribeButton";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tag } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  url: string;
  created: string;
  excerpt?: string;
  tags?: string[];
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/src/data/blogs.md');
    const text = await response.text();
    
    const posts: BlogPost[] = [];
    const sections = text.split('## ').slice(1);
    
    sections.forEach((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0];
      const date = lines[1];
      const url = lines[3];
      const excerpt = lines[2];
      const tags = lines[4]?.replace('tags:', '').split(',').map(tag => tag.trim()) || [];
      
      posts.push({
        id: String(index),
        title,
        url,
        created: date,
        excerpt,
        tags
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
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchBlogPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
        
        // Extract unique tags
        const tags = new Set<string>();
        fetchedPosts.forEach(post => {
          post.tags?.forEach(tag => tags.add(tag));
        });
        setAvailableTags(Array.from(tags).sort());
      })
      .catch(() => setError("Failed to load blog posts"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTag === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.tags?.includes(selectedTag)));
    }
  }, [selectedTag, posts]);

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-terminal-accent">Latest Blog Posts</h2>
          <SubscribeButton />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Tag className="text-terminal-muted" />
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {availableTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="text-terminal-info">Loading...</div>
      ) : error ? (
        <div className="text-terminal-error">{error}</div>
      ) : (
        <ScrollArea className="flex-grow">
          <ul className="space-y-4">
            {filteredPosts.map(post => (
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
                    {post.tags && (
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-terminal-border text-terminal-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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
        </ScrollArea>
      )}
    </div>
  );
};

export default VimBlog;
