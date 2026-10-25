"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  MessageSquare,
  Building2,
  MapPin,
  ExternalLink,
  Search,
  Filter,
  ArrowRight,
  Briefcase,
  AlertCircle,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { applicationService } from "@/services/apiClient";

const mockApplications = [
  {
    id: "app-101",
    internshipId: "int-1",
    companyName: "WebShark Technologies",
    role: "Full Stack Developer Intern",
    location: "Bengaluru, India (Hybrid)",
    workType: "Hybrid",
    stipend: "₹25,000 - ₹35,000 / mo",
    appliedDate: "Oct 18, 2026",
    status: "Shortlisted", // Applied, Reviewing, Shortlisted, Interviewing, Offered, Rejected
    stageNotes: "Technical interview scheduled on Google Meet for Oct 28 at 3:30 PM IST.",
    recruiterName: "Vikram Malhotra",
    recruiterRole: "Engineering Lead",
    skillsMatched: ["React", "Node.js", "Express", "MongoDB"],
    logo: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&h=100&fit=crop",
  },
  {
    id: "app-102",
    internshipId: "int-2",
    companyName: "Google Cloud Partners",
    role: "Cloud Engineering Intern",
    location: "Hyderabad, India (Remote)",
    workType: "Remote",
    stipend: "₹85,000 / mo",
    appliedDate: "Oct 15, 2026",
    status: "Interviewing",
    stageNotes: "Round 2: System Design & DSA assessment with senior cloud architect.",
    recruiterName: "Priya Sundaram",
    recruiterRole: "Campus Talent Lead",
    skillsMatched: ["Python", "Docker", "GCP", "Kubernetes"],
    logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&h=100&fit=crop",
  },
  {
    id: "app-103",
    internshipId: "int-3",
    companyName: "Razorpay Fintech",
    role: "Backend Systems Intern",
    location: "Bengaluru, India (Hybrid)",
    workType: "Hybrid",
    stipend: "₹45,000 / mo",
    appliedDate: "Oct 20, 2026",
    status: "Reviewing",
    stageNotes: "Application is under technical review by the Payments Core engineering team.",
    recruiterName: "Rohan Varma",
    recruiterRole: "Technical Recruiter",
    skillsMatched: ["Node.js", "PostgreSQL", "Kafka"],
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop",
  },
  {
    id: "app-104",
    internshipId: "int-4",
    companyName: "Xphia Solutions",
    role: "Frontend UX Engineer Intern",
    location: "Remote",
    workType: "Remote",
    stipend: "₹30,000 / mo",
    appliedDate: "Oct 22, 2026",
    status: "Offered",
    stageNotes: "Congratulations! Formal offer letter released. Please sign before Nov 05, 2026.",
    recruiterName: "Ananya Deshmukh",
    recruiterRole: "Head of People",
    skillsMatched: ["Next.js", "Tailwind CSS", "Framer Motion"],
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop",
  },
  {
    id: "app-105",
    internshipId: "int-5",
    companyName: "Zomato Logistics",
    role: "Data Science Intern",
    location: "Gurugram, India",
    workType: "Onsite",
    stipend: "₹40,000 / mo",
    appliedDate: "Sep 28, 2026",
    status: "Rejected",
    stageNotes: "Position closed for this cohort. We encourage you to apply for future openings.",
    recruiterName: "Talent Acquisition",
    recruiterRole: "Campus Recruitment",
    skillsMatched: ["Python", "SQL", "Pandas"],
    logo: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&h=100&fit=crop",
  },
];

const statusStyles = {
  Applied: {
    bg: "bg-slate-100 text-slate-700 border-slate-200",
    icon: Clock,
  },
  Reviewing: {
    bg: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Clock,
  },
  Shortlisted: {
    bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: CheckCircle2,
  },
  Interviewing: {
    bg: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Calendar,
  },
  Offered: {
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold",
    icon: CheckCircle2,
  },
  Rejected: {
    bg: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle,
  },
};

export default function StudentApplicationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [applications, setApplications] = useState(mockApplications);

  useEffect(() => {
    let isMounted = true;
    applicationService.getMyApplications(mockApplications).then((res) => {
      if (isMounted && res && Array.isArray(res) && res.length > 0) {
        const mapped = res.map((app) => ({
          id: app._id || app.id,
          internshipId: app.internship?._id || app.internshipId || "int-1",
          companyName: app.internship?.companyName || app.companyName || "Partner Company",
          role: app.internship?.title || app.role || "Internship Role",
          location: app.internship?.location || app.location || "Remote",
          workType: app.internship?.workType || app.workType || "Remote",
          stipend: app.internship?.stipend || app.stipend || "Competitive",
          appliedDate: app.createdAt
            ? new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : app.appliedDate || "Recently",
          status: app.status
            ? app.status.charAt(0).toUpperCase() + app.status.slice(1).toLowerCase()
            : "Applied",
          stageNotes: app.notes || app.stageNotes || "Application submitted successfully.",
          recruiterName: app.recruiterName || "Campus Recruiter",
          recruiterRole: app.recruiterRole || "Talent Team",
          skillsMatched: app.internship?.skills || app.skillsMatched || ["Software", "Engineering"],
          logo: app.internship?.logo || app.logo || "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&h=100&fit=crop",
        }));
        setApplications(mapped);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const tabs = [
    "All",
    "Applied",
    "Reviewing",
    "Shortlisted",
    "Interviewing",
    "Offered",
    "Rejected",
  ];

  const filteredApplications = applications.filter((app) => {
    const matchesTab = activeTab === "All" || app.status === activeTab;
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.skillsMatched.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar />

      <main className="flex-1 md:ml-[220px] flex flex-col min-w-0 pb-16">
        <DashboardHeader />

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <FileText className="w-6 h-6 text-[#4B9C93]" />
                My Internship Applications
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Track your active hiring pipelines, recruiter interview schedules, and released offers
              </p>
            </div>

            <Link
              href="/student/internships"
              className="px-4 py-2.5 bg-[#4B9C93] hover:bg-[#3d867e] text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Briefcase className="w-4 h-4" />
              Discover More Internships
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Total Applied
              </p>
              <p className="text-xl font-extrabold text-slate-900 mt-0.5">
                {applications.length}
              </p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                In Active Stages
              </p>
              <p className="text-xl font-extrabold text-blue-600 mt-0.5">
                {applications.filter((a) => ["Reviewing", "Shortlisted", "Interviewing"].includes(a.status)).length}
              </p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Offers Received
              </p>
              <p className="text-xl font-extrabold text-emerald-600 mt-0.5">
                {applications.filter((a) => a.status === "Offered").length}
              </p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Response Rate
              </p>
              <p className="text-xl font-extrabold text-[#4B9C93] mt-0.5">
                100%
              </p>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by company, role title, or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B9C93]"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      activeTab === tab
                        ? "bg-[#4B9C93] text-white shadow-2xs"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-800">
                  No applications found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You do not have any applications matching "{activeTab}". Browse open internships to submit an application.
                </p>
                <Link
                  href="/student/internships"
                  className="inline-block mt-2 px-4 py-2 bg-[#4B9C93] text-white text-xs font-semibold rounded-xl hover:bg-[#3d867e] transition-colors"
                >
                  Browse Internships
                </Link>
              </div>
            ) : (
              filteredApplications.map((app) => {
                const StatusIcon = statusStyles[app.status]?.icon || Clock;
                const statusBadgeStyle = statusStyles[app.status]?.bg || "bg-slate-100 text-slate-700";

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all p-5 sm:p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={app.logo}
                          alt={app.companyName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm sm:text-base text-slate-900">
                            {app.role}
                          </h3>
                          <p className="text-xs font-semibold text-[#4B9C93]">
                            {app.companyName}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {app.location}
                            </span>
                            <span>•</span>
                            <span className="font-medium text-slate-700">
                              {app.stipend}
                            </span>
                            <span>•</span>
                            <span>Applied on {app.appliedDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Tag */}
                      <div className="self-start sm:self-auto">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${statusBadgeStyle}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {app.status}
                        </span>
                      </div>
                    </div>

                    {/* Stage Notes / Next Steps */}
                    {app.stageNotes && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-[#4B9C93] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-900">Stage Update: </span>
                          <span>{app.stageNotes}</span>
                        </div>
                      </div>
                    )}

                    {/* Matched Skills & Footer Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-slate-400 mr-1">
                          Skills Matched:
                        </span>
                        {app.skillsMatched.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md bg-teal-50 text-[#2b8a78] text-[10px] font-medium"
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <Link
                          href="/student/chats"
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                          Chat Recruiter
                        </Link>
                        <Link
                          href={`/internships/${app.internshipId}`}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                        >
                          View Posting
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
