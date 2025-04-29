
import React from 'react';

interface SkillCardProps {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  years: number;
  icon: React.ReactNode;
  lineNumber: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, icon, lineNumber }) => {
  return (
    <div className="flex items-center group hover:bg-terminal-border/20 transition-colors py-1">
      <div className="w-12 text-right pr-4 text-terminal-muted select-none text-sm">
        {lineNumber}
      </div>
      <div className="flex items-center gap-3">
        <span className="w-5 h-5 flex items-center justify-center">
          {icon}
        </span>
        <span className="text-stone-300">{name}</span>
      </div>
    </div>
  );
};

export default SkillCard;
