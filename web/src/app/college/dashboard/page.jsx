"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  Award,
  CheckCircle2,
  Search,
  Filter,
  ArrowUpRight,
  Calendar,
  FileSpreadsheet,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

const kpiStats = [
  {
    title: "Registered Students",
    value: "1,480",
    change: "+12% this cohort",
    isPositive: true,
    icon: Users,
    bg: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Verified Skill Badges",
    value: "942",
    change: "+28% pass rate",
    isPositive: true,
    icon: Award,
    bg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Placed / Active Offers",
    value: "426",
    change: "88.4% placement rate",
    isPositive: true,
    icon: Briefcase,
    bg: "bg-teal-500/10 text-[#4B9C93]",
  },
  {
    title: "Partner Recruiters",
    value: "68",
    change: "+14 visiting companies",
    isPositive: true,
    icon: Building2,
    bg: "bg-purple-500/10 text-purple-600",
  },
];

const departmentBreakdown = [
  {
    name: "Computer Science & Engineering",
    students: 420,
    placedRate: 94,
    avgPackage: "8.4 LPA",
    topSkill: "Full-Stack & React",
    badgesEarned: 310,
  },
  {
    name: "Information Technology",
    students: 310,
    placedRate: 91,
    avgPackage: "7.8 LPA",
    topSkill: "Python & Cloud DevOps",
    badgesEarned: 245,
  },
  {
    name: "Artificial Intelligence & Data Science",
    students: 240,
    placedRate: 96,
    avgPackage: "9.2 LPA",
    topSkill: "PyTorch & Data Eng",
    badgesEarned: 215,
  },
  {
    name: "Electronics & Communication",
    students: 290,
    placedRate: 82,
    avgPackage: "6.5 LPA",
    topSkill: "Embedded C & IoT",
    badgesEarned: 112,
  },
  {
    name: "Mechanical Engineering",
    students: 220,
    placedRate: 74,
    avgPackage: "5.5 LPA",
    topSkill: "CAD & Mechatronics",
    badgesEarned: 60,
  },
];

const upcomingDrives = [
  {
    company: "Google Cloud India",
    logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&h=100&fit=crop",
    role: "Cloud Engineering Intern",
    date: "Oct 28, 2026",
    eligibleBranches: "CSE, IT, AI&DS",
    stipend: "₹85,000 / mo",
    applicantsCount: 142,
    status: "Shortlisting",
  },
  {
    company: "WebShark Technologies",
    logo: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&h=100&fit=crop",
    role: "Full-Stack Developer Intern",
    date: "Nov 02, 2026",
    eligibleBranches: "All Branches",
    stipend: "₹35,000 / mo",
    applicantsCount: 98,
    status: "Tests Active",
  },
  {
    company: "Razorpay Fintech",
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop",
    role: "Backend Systems Intern",
    date: "Nov 08, 2026",
    eligibleBranches: "CSE, IT",
    stipend: "₹65,000 / mo",
    applicantsCount: 110,
    status: "Upcoming",
  },
];

const topPerformers = [
  {
    name: "Joel Fernandez",
    roll: "2023-CS-042",
    dept: "Computer Science",
    cgpa: "9.4",
    badges: ["React Verified", "Node.js REST", "System Design"],
    offer: "Placed at Google Cloud (₹85k/mo)",
  },
  {
    name: "Sidharth Sharma",
    roll: "2023-AI-018",
    dept: "AI & Data Science",
    cgpa: "9.2",
    badges: ["Python DSA", "PyTorch Specialist"],
    offer: "Placed at WebShark (₹45k/mo)",
  },
  {
    name: "Reshma Varma",
    roll: "2023-IT-089",
    dept: "Information Technology",
    cgpa: "9.1",
    badges: ["Full-Stack", "Docker & AWS"],
    offer: "Interviewing (Razorpay)",
  },
  {
    name: "Ananya Iyer",
    roll: "2023-CS-104",
    dept: "Computer Science",
    cgpa: "8.9",
    badges: ["TypeScript Core", "Next.js Pro"],
    offer: "Offered (Xphia Tech)",
  },
];

export default function CollegeDashboardPage() {
  const [selectedDept, setSelectedDept] = useState("All");

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar />

      <main className="flex-1 md:ml-[220px] flex flex-col min-w-0 pb-16">
        <DashboardHeader />

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* ──── College Institutional Banner ──── */}
          <div className="bg-gradient-to-r from-[#2b8a78] via-[#3d867e] to-[#1e5d51] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-semibold uppercase tracking-wider">
                    Placement & TPO Cell
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 rounded-full text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    NAAC A++ Accredited
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Chaitanya Bharathi Institute of Technology
                </h1>
                <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
                  Institutional placement dashboard tracking candidate skill benchmarks, verified cryptographic credentials, and campus hiring drives for the 2026-2027 academic session.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/college/students"
                  className="px-4 py-2.5 bg-white text-[#2b8a78] font-bold rounded-xl text-xs hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  View Student Roster
                </Link>
                <button
                  onClick={() => alert("Placement Telemetry exported as NAAC / NIRF compliant PDF!")}
                  className="px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded-xl text-xs transition-colors inline-flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Export NIRF Data
                </button>
              </div>
            </div>
          </div>

          {/* ──── KPI Cards ──── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {stat.value}
                    </p>
                    <span className="inline-block mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {stat.change}
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ──── Department Performance & Placement Drives ──── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Department Breakdown (2 Columns) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Department Placement Radar
                  </h2>
                  <p className="text-xs text-slate-500">
                    Real-time placement rates & verified badges across departments
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">Filter:</span>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#4B9C93]"
                  >
                    <option value="All">All Departments</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="AI&DS">AI & DS</option>
                    <option value="ECE">ECE</option>
                  </select>
                </div>
              </div>

              <div className="space-y-5">
                {departmentBreakdown.map((dept) => (
                  <div
                    key={dept.name}
                    className="p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 transition-colors space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">
                          {dept.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {dept.students} Enrolled • Avg Package: {dept.avgPackage}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 rounded-md bg-teal-50 text-[#2b8a78] text-xs font-semibold">
                          Top: {dept.topSkill}
                        </span>
                        <span className="text-sm font-extrabold text-slate-900">
                          {dept.placedRate}% Placed
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-[#4B9C93] h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${dept.placedRate}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{dept.badgesEarned} Verified Badges Awarded</span>
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> High Placement Velocity
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Campus Drives (1 Column) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Campus Drives
                    </h2>
                    <p className="text-xs text-slate-500">
                      Active recruiter visits
                    </p>
                  </div>
                  <Calendar className="w-5 h-5 text-slate-400" />
                </div>

                <div className="space-y-4">
                  {upcomingDrives.map((drive) => (
                    <div
                      key={drive.company}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2.5"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={drive.logo}
                          alt={drive.company}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-slate-900 truncate">
                            {drive.company}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            {drive.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                        <span>Drive Date: {drive.date}</span>
                        <span className="font-semibold text-emerald-600">
                          {drive.stipend}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                        <span>{drive.applicantsCount} student applicants</span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                          {drive.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/internships"
                className="w-full mt-4 py-2.5 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors block"
              >
                Browse All Open Postings →
              </Link>
            </div>
          </div>

          {/* ──── Star Students & Placement Hall of Fame ──── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Top Student Performers & Verified Leaders
                </h2>
                <p className="text-xs text-slate-500">
                  Highest benchmark test scores and confirmed corporate offers
                </p>
              </div>
              <Link
                href="/college/students"
                className="text-xs font-semibold text-[#2b8a78] hover:underline inline-flex items-center gap-1"
              >
                View all students <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topPerformers.map((student) => (
                <div
                  key={student.roll}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/40 hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">
                      {student.roll}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold text-xs">
                      GPA {student.cgpa}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {student.name}
                    </h4>
                    <p className="text-xs text-slate-500">{student.dept}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {student.badges.map((b) => (
                      <span
                        key={b}
                        className="px-2 py-0.5 rounded-md bg-teal-50 text-[#2b8a78] text-[10px] font-semibold"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 text-xs font-semibold text-emerald-600">
                    {student.offer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
