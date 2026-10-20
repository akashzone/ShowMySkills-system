import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ShowMySkills | Showcase Your Talent & Build Your Portfolio",
  description: "ShowMySkills empowers creators, coders, designers, and doers to showcase their skills, build portfolios, rank among the best, and get noticed by peers and professionals.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png" }
    ],
    apple: "/logo.png",
  },
};

import { SidebarProvider } from "@/context/SidebarContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className={`${plusJakarta.className} antialiased text-[#000000] bg-[#F7F9F9] selection:bg-[#4B9C93]/20 selection:text-[#4B9C93]`}>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}

