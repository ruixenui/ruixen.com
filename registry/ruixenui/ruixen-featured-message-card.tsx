import React from "react";

interface Message {
  title: string;
  time: string;
  content: string;
  color: string;
}

const messages: Message[] = [
  {
    title: "Ruixen Design",
    time: "1m ago",
    content: "New components added to your team workspace.",
    color: "from-pink-400 to-indigo-500",
  },
  {
    title: "Pro User Feedback",
    time: "3m ago",
    content: "You've received 8 new user reviews this week.",
    color: "from-orange-500 to-pink-500",
  },
  {
    title: "Billing Alert",
    time: "6m ago",
    content: "Your subscription was successfully renewed.",
    color: "from-yellow-400 to-red-400",
  },
  {
    title: "Integration Hub",
    time: "10m ago",
    content: "Figma plugin connected to your dashboard.",
    color: "from-sky-400 to-blue-700",
  },
  {
    title: "Product Analytics",
    time: "12m ago",
    content: "Dashboard insights updated with latest metrics.",
    color: "from-orange-300 to-fuchsia-500",
  },
  {
    title: "Weekly Recap",
    time: "15m ago",
    content: "Here's what your team accomplished this week.",
    color: "from-green-400 to-blue-500",
  },
];

const RuixenFeaturedMessageCard = () => {
  return (
    <div className="w-full max-w-sm h-[280px] bg-transparent p-2 overflow-hidden font-sans relative">
      {/* Fade shadow overlay */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10"></div>

      <div className="space-y-2 relative z-0">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg transform transition duration-300 ease-in-out cursor-pointer animate-scaleUp`}
            style={{
              animationDelay: `${i * 300}ms`,
              animationFillMode: "forwards",
              opacity: 0,
            }}
          >
            <div
              className={`w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-lg bg-gradient-to-br ${msg.color}`}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-white">
                {msg.title}
                <span className="text-xs text-gray-500 before:content-['•'] before:mr-1">
                  {msg.time}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 line-clamp-1">
                {msg.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RuixenFeaturedMessageCard;
