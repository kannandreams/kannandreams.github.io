
import React from "react";
import { Button } from "../ui/button";
import { RssIcon } from "lucide-react";

const SubscribeButton = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      asChild
    >
      <a
        href="https://eggpuffengineer.substack.com/subscribe"
        target="_blank"
        rel="noopener noreferrer"
        className="text-terminal-accent hover:text-terminal-accent/90"
      >
        <RssIcon className="h-4 w-4" />
        Subscribe
      </a>
    </Button>
  );
};

export default SubscribeButton;

