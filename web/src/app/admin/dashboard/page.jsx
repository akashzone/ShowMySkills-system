"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Building2,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  Sliders,
  Settings,
  Search,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StudentRoleTag, { STUDENT_ROLE_TAGS } from "@/components/StudentRoleTag";

const initialStudents = [
  {
    id: 1,
    name: "Joel A. Jacob",
    email: "joel.jacob@cet.ac.in",
    college: "College of Engineering Trivandrum",
    department: "Computer Science (AI & ML)",
    tag: "Maintainer",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/5a82e47de052e6b1e8a0daf000f4c7f2631701fe?width=180",
    score: 23,
  },
  {
    id: 2,
    name: "S SIDHARTH",
    email: "sidharth.s@cet.ac.in",
    college: "College of Engineering Trivandrum",
    department: "Industrial Engineering",
    tag: "Admin",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/ab8e554398afb86403d2a7da0c420fe67c60f085?width=180",
    score: 63,
  },
  {
    id: 3,
    name: "Reshma Udhayan",
    email: "reshma.u@cet.ac.in",
    college: "College of Engineering Trivandrum",
    department: "Industrial Engineering",
    tag: "Promoter",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/c3059191c12486377929540d913e78b03ba9bddc?width=180",
    score: 72,
  },
  {
    id: 4,
    name: "Vaishnav RL",
    email: "vaishnav.rl@cet.ac.in",
    college: "College of Engineering Trivandrum",
    department: "Industrial Engineering",
    tag: "Ambassador",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/46fce00ed55aca498d8347d953abdc65e3ba2655?width=180",
    score: 81,
  },
  {
    id: 5,
    name: "Abhay SA",
    email: "abhay.sa@cet.ac.in",
    college: "College of Engineering Trivandrum",
    department: "Industrial Engineering",
    tag: "Contributor",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/f7559f012fcf86117c87ef912259ea3d4b2467c5?width=180",
    score: 72,
  },
  {
    id: 6,
    name: "Rishi Chandran",
    email: "rishi.c@cet.ac.in",
    college: "College of Engineering Trivandrum",
    department: "Industrial Engineering",
    tag: "Ambassador",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/ffe52c79545b2a85e56e27f28c8198d4551e8795?width=180",
    score: 81,
  },
  {
    id: 7,
    name: "asher john",
    email: "asher.john@cet.ac.in",
    college: "College of Engineering Trivandrum",
    department: "Computer Science (AI & ML)",
    tag: "Promoter",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/c108ffdec7504150607ccddcecf48749b1c50f54?width=180",
    score: 23,
  },
  {
    id: 8,
    name: "Devikripa S",
    email: "devikripa.s@cet.ac.in",
    college: "College of Engineering Trivandrum",
    department: "Industrial Engineering",
    tag: "Contributor",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/a5bb5f84222369dfc64ce1f696c04fdc36d5fa89?width=180",
    score: 63,
  },
];

const kpis = [
  { label: "Registered Students", value: "12,480", status: "+480 this week", icon: Users, color: "text-[#4B9C93]", bg: "bg-[#E6F7F3]" },
  { label: "Partner Companies", value: "340", status: "24 awaiting approval", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Internships", value: "892", status: "98% verified", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Skills Verified", value: "4,620", status: "+120 today", icon: CheckCircle, color: "text-amber-600", bg: "bg-amber-50" },
];

const pendingVerifications = [
  { id: 1, name: "Joel A. Jacob", college: "CET", skill: "Full Stack React / Next.js", score: "93%", type: "Assessment Audit", date: "Oct 19" },
  { id: 2, name: "S Sidharth", college: "CET", skill: "Product Design & Systems", score: "96%", type: "Portfolio Review", date: "Oct 19" },
  { id: 3, name: "CBIT College", college: "Hyderabad", skill: "Institutional Placement Handle", score: "Verified", type: "College Accreditation", date: "Oct 18" },
  { id: 4, name: "xphy Technologies", college: "Bengaluru", skill: "Employer Hiring License", score: "Verified", type: "Company Verification", date: "Oct 18" },
];

export default function AdminDashboardPage() {
  const [verifications, setVerifications] = useState(pendingVerifications);
  const [students, setStudents] = useState(initialStudents);
  const [selectedTagFilter, setSelectedTagFilter] = useState("all");
  const [studentSearch, setStudentSearch] = useState("");
  const [tagToast, setTagToast] = useState("");

  const tagOptions = Object.keys(STUDENT_ROLE_TAGS);

  const handleApprove = (id) => {
    setVerifications((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTagChange = (studentId, newTag) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return { ...s, tag: newTag };
        }
        return s;
      })
    );
    const targetStudent = students.find((s) => s.id === studentId);
    setTagToast(`Updated ${targetStudent?.name || "Student"}'s tag to ${newTag}`);
    setTimeout(() => setTagToast(""), 3500);
  };

  const filteredStudents = students.filter((s) => {
    if (selectedTagFilter !== "all" && s.tag !== selectedTagFilter) {
      return false;
    }
    if (!studentSearch.trim()) return true;
    const q = studentSearch.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.college.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q) ||
      s.tag.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F7F9F9] flex">
      <DashboardSidebar />

      <div className="flex-1 md:ml-[220px] ml-0 flex flex-col min-h-screen relative">
        <DashboardHeader />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
    
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map(({ label, value, status, icon: Icon, color, bg }) => (
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
                  <div className="text-xs text-emerald-600 font-medium mt-1">{status}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Verification & Moderation Queue */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Verification & Credential Approvals
                </h3>
                <p className="text-xs text-gray-500">
                  Pending audits for institution handles, company profiles, and student skill verifications
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {verifications.length} Pending
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-[#F9FAFB] text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-6">Entity / User</th>
                    <th className="py-3.5 px-6">Institution / Region</th>
                    <th className="py-3.5 px-6">Credential / Skill</th>
                    <th className="py-3.5 px-6">Audit Type</th>
                    <th className="py-3.5 px-6 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {verifications.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900">
                        {item.name}
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-500">
                        {item.college}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-800">
                        <span className="inline-flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-[#4B9C93]" />
                          {item.skill}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-3 py-1 rounded-lg text-xs font-bold bg-[#4B9C93] text-white hover:bg-[#3d867e] transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          Dismiss
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ──── Student System Role Tag Management (Admin, Maintainer, Intern, Contributor, Ambassador) ──── */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6F7F3] text-[#0D9488] text-[11px] font-bold border border-[#0D9488]/20 mb-1">
                  <span>Single-Tag Assignment Policy</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Student System Role Tags Assignment
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Students run platform functions with strictly one assigned system role: <span className="font-semibold text-gray-700">Admin, Maintainer, Promoter, Contributor, or Ambassador</span>
                </p>
              </div>

              {/* Toast confirmation */}
              {tagToast && (
                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold animate-in fade-in">
                  ✓ {tagToast}
                </div>
              )}
            </div>

            {/* Quick Tag Filter & Search */}
            <div className="p-6 border-b border-gray-100 bg-[#F8FAFC] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">
                  Filter:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedTagFilter("all")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedTagFilter === "all"
                      ? "bg-[#181E29] text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-slate-100"
                  }`}
                >
                  All ({students.length})
                </button>
                {tagOptions.map((tagKey) => {
                  const count = students.filter((s) => s.tag === tagKey).length;
                  const isSelected = selectedTagFilter === tagKey;
                  return (
                    <button
                      key={tagKey}
                      type="button"
                      onClick={() => setSelectedTagFilter(isSelected ? "all" : tagKey)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 bg-white border ${
                        isSelected
                          ? "ring-2 ring-[#4B9C93] border-transparent shadow-xs"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <StudentRoleTag tag={tagKey} size="xs" />
                      <span className="text-[10px] text-gray-400">({count})</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Search students..."
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4B9C93]"
                />
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-[#F9FAFB] text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-6">Student Profile</th>
                    <th className="py-3.5 px-6">College / Department</th>
                    <th className="py-3.5 px-6">Current Assigned Tag</th>
                    <th className="py-3.5 px-6">Assign New Tag (1 Per Student)</th>
                    <th className="py-3.5 px-6 text-right">Reputation Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={st.avatar}
                            alt={st.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-100"
                          />
                          <div>
                            <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                              <span>{st.name}</span>
                              <StudentRoleTag tag={st.tag} size="xs" />
                            </div>
                            <div className="text-xs text-gray-400 font-mono mt-0.5">{st.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-xs text-gray-600">
                        <div className="font-semibold text-gray-800">{st.college}</div>
                        <div className="text-gray-500 text-[11px] mt-0.5">{st.department}</div>
                      </td>

                      <td className="py-4 px-6">
                        <StudentRoleTag tag={st.tag} size="sm" />
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <select
                            value={st.tag}
                            onChange={(e) => handleTagChange(st.id, e.target.value)}
                            aria-label={`Assign tag for ${st.name}`}
                            className="text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#4B9C93] focus:ring-1 focus:ring-[#4B9C93] shadow-2xs cursor-pointer"
                          >
                            {tagOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt} ({STUDENT_ROLE_TAGS[opt]?.desc.split(" ")[0]})
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <span className="font-mono font-bold text-xs text-[#0D9488] bg-[#CCFBF1] px-2.5 py-1 rounded-md">
                          ★ {st.score}
                        </span>
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
