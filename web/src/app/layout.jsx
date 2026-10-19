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
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className={`${plusJakarta.className} antialiased text-gray-900 bg-[#FFFFFF] selection:bg-teal-100 selection:text-teal-900`}>
        {children}
      </body>
    </html>
  );
}

