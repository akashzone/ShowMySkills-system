"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Home,
  ArrowLeft,
  Briefcase,
  Compass,
  Rocket,
  Search,
  Users,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/internships?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const quickLinks = [
    {
      title: "Student Portal",
      desc: "Track applications & active internships",
      href: "/student/internships",
      icon: Compass,
      tag: "Popular",
      badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/30",
    },
    {
      title: "Explore Internships",
      desc: "Curated tech roles & verified openings",
      href: "/internships",
      icon: Briefcase,
      tag: "Active",
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    },
    {
      title: "Career Launchpad",
      desc: "Free interview roadmaps & starter kits",
      href: "/launchpad",
      icon: Rocket,
      tag: "Resources",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    },
    {
      title: "Talent Showcase",
      desc: "Discover verified student creators & coders",
      href: "/people",
      icon: Users,
      tag: "Network",
      badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col justify-between selection:bg-[#4B9C93]/30 selection:text-white relative overflow-hidden font-sans">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-b from-[#4B9C93]/25 via-teal-900/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] bg-teal-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] right-[-5%] w-[400px] h-[400px] bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Cyber Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #4B9C93 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Header / Branding Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-slate-800/60 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative p-1.5 rounded-xl bg-slate-900/80 border border-teal-500/30 shadow-md group-hover:border-teal-400 transition-all">
            <img
              src="/logo.png"
              alt="ShowMySkills Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none group-hover:text-teal-300 transition-colors">
              ShowMy<span className="text-[#4B9C93]">Skills</span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-wide font-medium">
              Talent & Internship Ecosystem
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/help"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-900/80 transition-all border border-transparent hover:border-slate-800"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Helpdesk
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/40 px-3.5 py-1.5 rounded-lg transition-all shadow-sm"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main 404 Hero Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 text-center max-w-5xl mx-auto w-full">
        {/* Holographic Glowing Logo Emblem */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#4B9C93] via-teal-400 to-emerald-400 opacity-20 blur-xl group-hover:opacity-35 transition-all duration-700 animate-pulse" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-900/90 border-2 border-teal-500/40 backdrop-blur-xl flex items-center justify-center shadow-2xl p-3">
            <img
              src="/logo.png"
              alt="ShowMySkills"
              className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(75,156,147,0.4)] transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-500/10 border border-teal-500/30 text-teal-300 mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#4B9C93] animate-ping" />
          <span className="tracking-wide">STATUS 404 • ROUTE NOT FOUND</span>
        </div>

        {/* 404 Giant Number with Gradient Glow */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-[#4B9C93] to-emerald-400 drop-shadow-[0_12px_32px_rgba(75,156,147,0.35)] leading-none select-none">
          404
        </h1>

        {/* Headline & Friendly Message */}
        <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight max-w-2xl">
          Whoops! Looks Like You&apos;ve Wandered Off The Map
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          The page or resource you are looking for doesn&apos;t exist, has been archived, or was moved.
          Let&apos;s get you right back to your dashboard and opportunities.
        </p>

        {/* Search Bar Shortcut */}
        <form
          onSubmit={handleSearch}
          className="mt-6 w-full max-w-md relative flex items-center"
        >
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search internships or roles (e.g. React, Python, Design)..."
            className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#4B9C93] focus:ring-2 focus:ring-[#4B9C93]/20 backdrop-blur-md transition-all shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#4B9C93] hover:bg-[#3d867e] transition-colors"
          >
            Find
          </button>
        </form>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#4B9C93] hover:bg-[#3d867e] shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>

          <Link
            href="/internships"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-teal-500/50 hover:text-white transition-all shadow-sm"
          >
            <Briefcase className="w-4 h-4 text-[#4B9C93]" />
            Browse Internships
          </Link>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-transparent hover:bg-slate-900/60 border border-slate-800/80 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Quick Directory Cards */}
        <div className="mt-12 w-full max-w-4xl">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Popular Destinations
            </span>
            <span className="text-xs text-teal-400 font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified Links
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-teal-500/40 text-left transition-all duration-200 backdrop-blur-md shadow-sm hover:shadow-lg hover:shadow-teal-950/40 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[#4B9C93] group-hover:scale-110 group-hover:bg-[#4B9C93] group-hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} ShowMySkills System.</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">Engineered for Creators & Recruiters.</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-slate-300 transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">
            Privacy
          </Link>
          <Link
            href="https://showmyskills.xyphx.com/api/docs"
            target="_blank"
            className="hover:text-teal-400 transition-colors inline-flex items-center gap-1"
          >
            API Docs <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
