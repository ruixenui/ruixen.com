import type { Metadata } from "next";
import SideBar from "@/components/ruixen/SideBar";
import Navbar from "@/components/ruixen/Navbar";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={`${roboto.className}`}>
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
