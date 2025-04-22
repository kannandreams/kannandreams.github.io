
import React, { useEffect, useState } from "react";

// We'll import the LaTeX as a raw string.
// Vite allows importing text files as 'text' with ?raw
// You may need to update the path if you move the file.
let latexResume: string = "";
try {
  latexResume = require('!!raw-loader!../resume.tex').default;
} catch {
  // fallback: use dynamic import for Vite
}
// If you have a real file server, you can also fetch /public/resume.tex

const latexToPlain = (latex: string): string[] => {
  // Super basic LaTeX to plain block extractor (sections and items)
  // For real parsing, use a package.
  const lines = latex
    .replace(/\\section\{([^}]*)\}/g, "\n## $1\n")
    .replace(/\\subsection\{([^}]*)\}/g, "\n### $1\n")
    .replace(/\\begin\{itemize\}/g, "")
    .replace(/\\end\{itemize\}/g, "")
    .replace(/\\item/g, "-")
    .replace(/\\textbf\{([^}]*)\}/g, "$1")
    .replace(/\\textit\{([^}]*)\}/g, "$1")
    .replace(/\\underline\{([^}]*)\}/g, "$1")
    .replace(/\\([a-zA-Z]+\*?)(\[[^\]]*\])?\{([^}]*)\}/g, "$3") // fallback for other commands
    .replace(/\\\\/g, "\n")
    .replace(/\n{2,}/g, "\n\n")
    .split("\n");
  return lines;
};

const fallbackResume = [
  "John Doe",
  "",
  "Contact: john@example.com | +1 555 555 5555 | github.com/john-doe",
  "",
  "## Education",
  "B.Sc. in Computer Science, Big University (2019–2023)",
  "",
  "## Experience",
  "Software Engineer, Acme Corp (2023–present)",
  "- Developed scalable React apps",
  "- Automated deployment pipelines (CI/CD)",
  "",
  "## Skills",
  "- React, Typescript, Node.js",
  "- Git, Docker, SQL",
  "",
  "References available upon request."
];

const RecruiterResume: React.FC = () => {
  const [resumeLines, setResumeLines] = useState<string[]>(fallbackResume);

  useEffect(() => {
    // Try to load LaTeX file if available
    fetch("/resume.tex")
      .then(r => r.text())
      .then(latex => {
        const parsed = latexToPlain(latex);
        setResumeLines(parsed);
      })
      .catch(() => {
        setResumeLines(fallbackResume);
      });
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white text-gray-900 rounded-lg shadow animate-fade-in min-h-[700px]">
      {resumeLines.map((line, i) => {
        if (line.startsWith("## ")) {
          return <h2 key={i} className="text-2xl font-bold mt-8 mb-2">{line.replace(/^## /, "")}</h2>;
        } else if (line.startsWith("### ")) {
          return <h3 key={i} className="text-lg font-semibold mt-6 mb-2">{line.replace(/^### /, "")}</h3>;
        } else if (line.startsWith("-")) {
          return <div key={i} className="pl-6 list-disc text-base">{line}</div>;
        } else if (line.trim() === "") {
          return <div key={i} style={{ height: 12 }}></div>;
        } else if (i === 0) {
          return <h1 key={i} className="text-3xl font-bold mb-1">{line}</h1>;
        } else if (i === 2) {
          return <div key={i} className="text-terminal-muted mb-2">{line}</div>;
        } else {
          return <div key={i} className="text-base">{line}</div>;
        }
      })}
    </div>
  );
};

export default RecruiterResume;
