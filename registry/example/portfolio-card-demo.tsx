import PortfolioCard from "../ruixenui/portfolio-card";

export default function PortfolioCardDemo() {
  return (
    <div className="flex items-center justify-center h-screen">
      <PortfolioCard
        name="Ruixen"
        role="Software Developer Engineer"
        image="https://github.com/shadcn.png"
        status="Available for Remote Projects"
        skills={[
          { name: "TypeScript", level: 5 },
          { name: "Node.js", level: 4 },
          { name: "AWS", level: 3 },
        ]}
        portfolio="https://github.com/ruixenui"
      />
    </div>
  );
}
