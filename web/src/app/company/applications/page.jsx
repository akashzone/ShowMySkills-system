"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  ChevronDown,
  Building2,
  GraduationCap,
  Sparkles,
  UserCheck,
  XCircle,
  FileText,
  Mail,
  Phone,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

const initialApplications = [
  {
    id: 1,
    name: "Joel A. Jacob",
    role: "Frontend Developer Intern",
    college: "College of Engineering Trivandrum",
    score: 93,
    status: "Shortlisted",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    appliedDate: "Oct 19, 2026",
    email: "joel.jacob@cet.ac.in",
    phone: "+91 98471 23456",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/5a82e47de052e6b1e8a0daf000f4c7f2631701fe?width=180",
    portfolioUrl: "https://github.com/joel-jacob",
    notes: "Demonstrated strong mastery in React 19 architecture and Next.js App Router.",
  },
  {
    id: 2,
    name: "S SIDHARTH",
    role: "UI/UX Product Design Intern",
    college: "College of Engineering Trivandrum",
    score: 96,
    status: "Interviewing",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    appliedDate: "Oct 18, 2026",
    email: "sidharth.s@cet.ac.in",
    phone: "+91 94470 65432",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/ab8e554398afb86403d2a7da0c420fe67c60f085?width=180",
    portfolioUrl: "https://behance.net/sidharth-design",
    notes: "Portfolio includes enterprise analytics design systems and mobile prototypes.",
  },
  {
    id: 3,
    name: "Ananya Sharma",
    role: "Machine Learning Research Intern",
    college: "IIT Madras",
    score: 89,
    status: "Reviewing",
    skills: ["PyTorch", "Python", "Data Analytics", "NLP"],
    appliedDate: "Oct 18, 2026",
    email: "ananya.sharma@iitm.ac.in",
    phone: "+91 91234 56789",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80",
    portfolioUrl: "https://github.com/ananya-ml",
    notes: "Published work in transformer model fine-tuning for low-resource languages.",
  },
  {
    id: 4,
    name: "Rahul Verma",
    role: "Full Stack Engineering Intern",
    college: "BITS Pilani",
    score: 91,
    status: "Applied",
    skills: ["Node.js", "PostgreSQL", "React", "Docker"],
    appliedDate: "Oct 17, 2026",
    email: "rahul.verma@pilani.bits.ac.in",
    phone: "+91 98111 22334",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&auto=format&fit=crop&q=80",
    portfolioUrl: "https://github.com/rahul-verma",
    notes: "Built scalable payment webhook services with 99.9% uptime test suites.",
  },
];

const statusTabs = ["All", "Applied", "Reviewing", "Shortlisted", "Interviewing", "Hired", "Rejected"];

export default function CompanyApplicationsPage() {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredApplications = applications.filter((app) => {
    const matchesTab = selectedTab === "All" || app.status.toLowerCase() === selectedTab.toLowerCase();
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleUpdateStatus = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9F9] flex">
      <DashboardSidebar />

      <div className="flex-1 md:ml-[220px] ml-0 flex flex-col min-h-screen relative">
        <DashboardHeader />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Applications Tracking (ATS)
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage candidate pipelines, conduct evaluations, and track internship offers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 shadow-2xs">
                {applications.length} Total Applicants
              </span>
            </div>
          </div>

          {/* Search & Pipeline Filter Tabs */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs mb-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative flex items-center bg-[#F9FAFB] border border-[#E5E6E5] rounded-xl px-4 py-2.5 focus-within:border-[#4B9C93] focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by candidate name, role, college..."
                  className="w-full bg-transparent pl-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Stage Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
              {statusTabs.map((tab) => {
                const count =
                  tab === "All"
                    ? applications.length
                    : applications.filter((a) => a.status.toLowerCase() === tab.toLowerCase()).length;
                const active = selectedTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-3.5 py-1.5 rounded-full shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? "bg-[#4B9C93] text-white shadow-xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200/80"
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        active ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Applications Grid / Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApplications.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:border-[#4B9C93]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-full object-cover border border-gray-200 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{candidate.name}</h4>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[150px]">{candidate.college}</span>
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E6F7F3] text-[#4B9C93]">
                      <CheckCircle2 className="w-3 h-3" />
                      {candidate.score}%
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs font-semibold text-gray-800">{candidate.role}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Applied on {candidate.appliedDate}</div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <select
                    value={candidate.status}
                    onChange={(e) => handleUpdateStatus(candidate.id, e.target.value)}
                    className="text-xs font-semibold py-1 px-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 cursor-pointer focus:outline-none focus:border-[#4B9C93]"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/company/chats?user=${candidate.id}`}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-[#4B9C93] hover:bg-[#E6F7F3] transition-colors"
                      title="Send Message"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#4B9C93] text-white hover:bg-[#3d867e] transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 text-gray-400">
              <FileText className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-semibold">No candidates match this pipeline filter.</p>
            </div>
          )}

          {/* Candidate Detail Modal */}
          {selectedCandidate && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  ✕
                </button>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#4B9C93]/30"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedCandidate.name}</h3>
                    <p className="text-xs text-gray-500">{selectedCandidate.college}</p>
                    <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E6F7F3] text-[#4B9C93]">
                      {selectedCandidate.role}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 py-3 border-y border-gray-100 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedCandidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                    <a
                      href={selectedCandidate.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#4B9C93] hover:underline font-semibold"
                    >
                      {selectedCandidate.portfolioUrl}
                    </a>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-700 block mb-1">Recruiter Notes:</span>
                    <p className="text-gray-500 leading-relaxed">{selectedCandidate.notes}</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3">
                  <Link
                    href={`/company/chats?user=${selectedCandidate.id}`}
                    className="flex-1 py-2 text-center rounded-xl bg-[#4B9C93] text-white text-xs font-bold hover:bg-[#3d867e] transition-colors"
                  >
                    Open Chat Thread
                  </Link>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
