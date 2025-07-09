import type { Metadata } from "next";
import Navbar from "@/components/ruixen/Navbar";
import SideBar from "@/components/ruixen/SideBar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "Docs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${poppins.className}`}>
    <Navbar />
    <div className="inner-container flex">
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
