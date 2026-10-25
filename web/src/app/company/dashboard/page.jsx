"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Clock,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  PlusCircle,
  Eye,
  Search,
  Filter,
  Sparkles,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { applicationService } from "@/services/apiClient";

const stats = [
  { label: "Active Postings", value: "6", change: "+2 this month", icon: Briefcase, color: "text-[#4B9C93]", bg: "bg-[#E6F7F3]" },
  { label: "Total Applicants", value: "184", change: "+34 new today", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Under Review", value: "42", change: "18 pending review", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Interviews Scheduled", value: "14", change: "4 this week", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
];

const mockRecentApplicants = [
  {
    id: 1,
    name: "Joel A. Jacob",
    role: "Frontend Developer Intern",
    college: "College of Engineering Trivandrum",
    score: 93,
    status: "Shortlisted",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    skills: ["React", "Next.js", "Tailwind CSS"],
    appliedDate: "Oct 19, 2026",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/5a82e47de052e6b1e8a0daf000f4c7f2631701fe?width=180",
  },
  {
    id: 2,
    name: "S SIDHARTH",
    role: "UI/UX Product Design Intern",
    college: "College of Engineering Trivandrum",
    score: 96,
    status: "Interview Scheduled",
    statusColor: "bg-purple-50 text-purple-700 border-purple-200",
    skills: ["Figma", "Design Systems", "User Research"],
    appliedDate: "Oct 18, 2026",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/ab8e554398afb86403d2a7da0c420fe67c60f085?width=180",
  },
  {
    id: 3,
    name: "Ananya Sharma",
    role: "Machine Learning Research Intern",
    college: "IIT Madras",
    score: 89,
    status: "Reviewing",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    skills: ["PyTorch", "Python", "Data Analytics"],
    appliedDate: "Oct 18, 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Rahul Verma",
    role: "Full Stack Engineering Intern",
    college: "BITS Pilani",
    score: 91,
    status: "Applied",
    statusColor: "bg-blue-50 text-blue-700 border-blue-200",
    skills: ["Node.js", "PostgreSQL", "React"],
    appliedDate: "Oct 17, 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&auto=format&fit=crop&q=80",
  },
];

export default function CompanyDashboardPage() {
  const [recentApplicants, setRecentApplicants] = useState(mockRecentApplicants);

  useEffect(() => {
    let isMounted = true;
    applicationService.getCompanyApplications({}, mockRecentApplicants).then((res) => {
      if (isMounted && res && Array.isArray(res) && res.length > 0) {
        const mapped = res.map((app) => ({
          id: app._id || app.id,
          name: app.candidate?.name || app.name || "Student Candidate",
          role: app.internship?.title || app.role || "Internship Role",
          college: app.candidate?.college || app.college || "University Partner",
          score: app.score || 90,
          status: app.status ? (app.status.charAt(0).toUpperCase() + app.status.slice(1).toLowerCase()) : "Applied",
          statusColor: app.status === "Shortlisted" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                       app.status === "Interviewing" ? "bg-purple-50 text-purple-700 border-purple-200" :
                       app.status === "Reviewing" ? "bg-amber-50 text-amber-700 border-amber-200" :
                       "bg-blue-50 text-blue-700 border-blue-200",
          skills: app.candidate?.skills || app.skills || ["React", "TypeScript"],
          appliedDate: app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : app.appliedDate || "Recently",
          avatar: app.candidate?.avatar || app.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80",
        }));
        setRecentApplicants(mapped);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9F9] flex">
      <DashboardSidebar />

      <div className="flex-1 md:ml-[220px] ml-0 flex flex-col min-h-screen relative">
        <DashboardHeader />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-[#4B9C93] to-[#367971] text-white p-6 sm:p-8 rounded-3xl shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Hiring Season 2026 Active</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Candidate Pipeline & Recruiter Hub
              </h2>
              <p className="text-white/80 text-sm mt-1 max-w-xl">
                Review verified campus talent, manage applications, and conduct interviews with top university candidates.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/company/applications?new=true"
                className="inline-flex items-center gap-2 bg-white text-[#4B9C93] hover:bg-slate-50 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                Post New Opening
              </Link>
            </div>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(({ label, value, change, icon: Icon, color, bg }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {label}
                  </span>
                  <div className={`w-9 h-9 rounded-xl ${bg} ${color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-400 mt-1">{change}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Candidate Applications */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Applications
                </h3>
                <p className="text-xs text-gray-500">
                  Candidates waiting for review and interview scheduling
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/company/applications"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#4B9C93] hover:text-[#3d867e] transition-colors"
                >
                  <span>View All Applications ({recentApplicants.length})</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-[#F9FAFB] text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-6">Candidate</th>
                    <th className="py-3.5 px-6">Applied Role</th>
                    <th className="py-3.5 px-6">Match Score</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentApplicants.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                          <div>
                            <div className="font-bold text-gray-900">{candidate.name}</div>
                            <div className="text-xs text-gray-400">{candidate.college}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-800">{candidate.role}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {candidate.skills.slice(0, 2).map((s) => (
                            <span
                              key={s}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E6F7F3] text-[#4B9C93] font-bold text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{candidate.score}% Match</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${candidate.statusColor}`}
                        >
                          {candidate.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-400">
                        {candidate.appliedDate}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/company/applications?candidate=${candidate.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#4B9C93] text-white hover:bg-[#3d867e] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
