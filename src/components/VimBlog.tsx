
import React, { useEffect, useState } from "react";
import SubscribeButton from "./blog/SubscribeButton";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

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

const ITEMS_PER_PAGE = 5;

const VimBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchBlogPosts()
      .then(setPosts)
      .catch(() => setError("Failed to load blog posts"))
      .finally(() => setLoading(false));
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  // Debugging pagination
  console.log('Total posts:', posts.length);
  console.log('Total pages:', totalPages);
  console.log('Current page:', currentPage);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-terminal-accent">Latest Blog Posts</h2>
        <SubscribeButton />
      </div>

      {/* Tags section - will be implemented when tags are added to blogs.md */}
      <div className="mb-4">
        {/* Tags will be rendered here */}
      </div>

      {loading ? (
        <div className="text-terminal-info">Loading...</div>
      ) : error ? (
        <div className="text-terminal-error">{error}</div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto mb-4">
            <ul className="space-y-4 mb-4">
              {currentPosts.map(post => (
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
          </div>

          {/* Pagination section - always show when more than one page exists */}
          {totalPages > 1 && (
            <div className="py-4 mt-auto border-t border-terminal-border">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        className="cursor-pointer bg-terminal-background hover:bg-terminal-border text-terminal-foreground"
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer bg-terminal-background hover:bg-terminal-border text-terminal-foreground"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        className="cursor-pointer bg-terminal-background hover:bg-terminal-border text-terminal-foreground"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VimBlog;
