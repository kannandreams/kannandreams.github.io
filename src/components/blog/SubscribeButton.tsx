
import React from "react";
import { Button } from "../ui/button";
import { RssIcon } from "lucide-react";

const SubscribeButton = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
      asChild
    >
      <a
        href="https://eggpuffengineer.substack.com/subscribe"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        <RssIcon className="h-4 w-4" />
        Subscribe
      </a>
    </Button>
  );
};

export default SubscribeButton;
