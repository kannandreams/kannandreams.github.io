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
import { ScrollArea } from "./ui/scroll-area";

interface BlogPost {
  id: string;
  title: string;
  url: string;
  created: string;
  excerpt?: string;
  tags?: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The AI Paradox",
    created: "2025-04",
    excerpt: "Balancing Progress and People in an AI-Driven World",
    url: "https://eggpuffengineer.substack.com/p/the-ai-paradox"
  },
  {
    id: "2",
    title: "How the Priming Effect Shapes Engineers: The Hidden Biases in Our Decisions",
    created: "2025-03",
    excerpt: "Explore how the priming effect subtly shapes engineers and their decision-making in different context",
    url: "https://eggpuffengineer.substack.com/p/how-the-priming-effect-shapes-engineers"
  },
  {
    id: "3",
    title: "How WebAssembly is reshaping Data & AI",
    created: "2025-03",
    excerpt: "WebAssembly is now gaining traction in the data world, thanks to its performance advantages, portability, and security",
    url: "https://eggpuffengineer.substack.com/p/the-wasm-edge-how-webassembly-is"
  },
  {
    id: "4",
    title: "LLMAnalytics: Beyond Clicks and Views",
    created: "2025-03",
    excerpt: "Exploring new methods, modeling, and experimentation for LLM Analytics",
    url: "https://eggpuffengineer.substack.com/p/llmanalytics-beyond-clicks-and-views"
  },
  {
    id: "5",
    title: "Engineering Challenges in Building NLP-Driven UI/UX",
    created: "2025-03",
    excerpt: "Traditional search-based and form-driven UI paradigms are rapidly being replaced by conversational, dynamic, and intent-aware interfaces.",
    url: "https://eggpuffengineer.substack.com/p/engineering-challenges-in-building"
  },
  {
    id: "6",
    title: "Why Pi-Shaped Engineering Teams Matter in This AI Era",
    created: "2025-03",
    excerpt: "This post was born from a frustration: the persistent myth that data engineers are merely 'pipeline builders.'",
    url: "https://eggpuffengineer.substack.com/p/are-you-building-pi-shaped-teams"
  },
  {
    id: "7",
    title: "Engineering Challenges in Building NLP-Driven UI/UX",
    created: "2025-03",
    excerpt: "Traditional search-based and form-driven UI paradigms are rapidly being replaced by conversational, dynamic, and intent-aware interfaces.",
    url: "https://eggpuffengineer.substack.com/p/engineering-challenges-in-building"
  }
];

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Using hardcoded blog posts instead of fetching from file');
    return BLOG_POSTS;
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
      .then((fetchedPosts) => {
        console.log('Fetched posts:', fetchedPosts.length);
        setPosts(fetchedPosts);
      })
      .catch((err) => {
        console.error('Error in useEffect:', err);
        setError("Failed to load blog posts");
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  console.log('Total posts:', posts.length);
  console.log('Total pages:', totalPages);
  console.log('Current page:', currentPage);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-terminal-accent">Latest Blog Posts</h2>
        <SubscribeButton />
      </div>

      <div className="mb-4">
        {/* Tags will be rendered here */}
      </div>

      {loading ? (
        <div className="text-terminal-info">Loading...</div>
      ) : error ? (
        <div className="text-terminal-error">{error}</div>
      ) : (
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-grow mb-4" style={{ height: "calc(100vh - 280px)" }}>
            {posts.length === 0 ? (
              <div className="text-terminal-muted">No blog posts found. Please check the blogs.md file.</div>
            ) : (
              <ul className="space-y-4 mb-4 pr-2">
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
            )}
          </ScrollArea>

          {totalPages > 1 && (
            <div className="mt-auto py-3 bg-terminal-background border-t border-terminal-border">
              <Pagination>
                <PaginationContent className="flex justify-center gap-2">
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        className="cursor-pointer bg-terminal-accent text-terminal-background hover:bg-terminal-border hover:text-terminal-foreground transition-colors px-3 py-1.5"
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className={`cursor-pointer min-w-[2.5rem] h-[2.5rem] flex items-center justify-center ${
                          currentPage === page 
                            ? "bg-terminal-accent text-terminal-background font-bold" 
                            : "bg-terminal-border text-terminal-foreground hover:bg-terminal-accent hover:text-terminal-background"
                        } transition-colors`}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        className="cursor-pointer bg-terminal-accent text-terminal-background hover:bg-terminal-border hover:text-terminal-foreground transition-colors px-3 py-1.5"
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
