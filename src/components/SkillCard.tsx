
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface SkillCardProps {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  years: number;
  icon: React.ReactNode;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, level, years, icon }) => {
  const getLevelColor = () => {
    switch (level) {
      case "Expert":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20";
      case "Advanced":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20";
      case "Intermediate":
        return "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 border-gray-500/20";
    }
  };

  return (
    <div className="group">
      <Badge 
        variant="outline"
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${getLevelColor()} hover:scale-105`}
      >
        {icon}
        <span>{name}</span>
        <span className="ml-auto text-xs opacity-60">{years}y</span>
      </Badge>
    </div>
  );
};

export default SkillCard;
