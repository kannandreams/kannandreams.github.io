
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Star, StarHalf, StarOff } from "lucide-react";

interface SkillCardProps {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  years: number;
  icon: React.ReactNode;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, level, years, icon }) => {
  const getLevelIcon = () => {
    switch (level) {
      case "Expert":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "Advanced":
        return <StarHalf className="h-4 w-4 text-yellow-500" />;
      case "Intermediate":
        return <StarOff className="h-4 w-4 text-gray-400" />;
    }
  };

  const getLevelColor = () => {
    switch (level) {
      case "Expert":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "Advanced":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "Intermediate":
        return "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20";
    }
  };

  return (
    <Card className="bg-terminal-border/20 border-terminal-border/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="font-semibold text-terminal-foreground">{name}</h3>
        </div>
        <Badge 
          className={`flex items-center gap-1 ${getLevelColor()}`}
          variant="outline"
        >
          {getLevelIcon()}
          {level}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-terminal-muted">
          {years} {years === 1 ? "year" : "years"} of experience
        </p>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
