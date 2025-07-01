import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SideBar from "@/components/ruixen/SideBar";
import Navbar from "@/components/ruixen/Navbar";
const poppin = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={`${poppin.className}`}>
        <Navbar />
        <div className="inner-container flex dark:text-white text-black bg-white dark:bg-black">
          <div className="fixed top-20 w-64">
              <SideBar />
          </div>
          <div className="w-full ml-64">
            {children}
          </div>
        </div>
      </div>
  );
}
