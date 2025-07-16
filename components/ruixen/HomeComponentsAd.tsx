import React from "react";

const cardContent = {
  title: "Lorem ipsum dolor",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, hic ipsum! Qui dicta debitis aliquid quo molestias explicabo iure!",
};

const PlusCard: React.FC<{
  className?: string;
  title: string;
  description: string;
}> = ({ className = "", title, description }) => {
  return (
    <div
      className={`relative border border-dashed border-zinc-400 dark:border-zinc-700 rounded-lg p-6 bg-white dark:bg-zinc-950 ${className}`}
    >
      {/* Corner SVG icons */}
      <CornerPlusIcons />

      {/* Card content */}
      <div>
        <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -top-3 -left-3" />
    <PlusIcon className="absolute -top-3 -right-3" />
    <PlusIcon className="absolute -bottom-3 -left-3" />
    <PlusIcon className="absolute -bottom-3 -right-3" />
  </>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    className={`dark:text-white text-black size-6 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

const HomeComponentsAd: React.FC = () => {
  return (
    <section className="bg-white dark:bg-black dark:bg-transparent  border border-gray-200 dark:border-gray-800">
      {/* Heading Section */}
      <div className="mx-auto container  border border-gray-200 dark:border-gray-800 py-12 border-t-0">
        {/* Bento Grid */}
        <div className="grid grid-cols-6 auto-rows-[150px] gap-4">
          <PlusCard {...cardContent} className="col-span-3 row-span-2" />
          <PlusCard {...cardContent} className="col-span-2 row-span-2" />
          <PlusCard {...cardContent} className="col-span-4 row-span-1" />
          <PlusCard {...cardContent} className="col-span-2 row-span-1" />
          <PlusCard {...cardContent} className="col-span-2 row-span-1" />
        </div>
        <div className="max-w-2xl ml-auto text-right px-6 -mt-14">
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
            Built for performance. Designed for flexibility.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Ruixen UI gives you the tools to build beautiful, high-performing websites with lightning speed. Each component is thoughtfully designed to be flexible, reusable, and accessible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeComponentsAd;
