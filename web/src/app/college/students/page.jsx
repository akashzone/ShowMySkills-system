"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Award,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  GraduationCap,
  Download,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { peopleService } from "@/services/apiClient";

const initialStudents = [
  {
    id: "stu-1",
    name: "Joel Fernandez",
    email: "joel.fernandez@cbit.edu",
    rollNumber: "2023-CS-042",
    department: "Computer Science",
    graduationYear: 2027,
    cgpa: "9.4",
    idVerificationStatus: "verified", // verified, pending, rejected
    placementStatus: "Placed", // Placed, Interviewing, Seeking
    company: "Google Cloud",
    roleTag: "Maintainer",
    skills: ["React", "Node.js", "System Design", "TypeScript"],
    badgesCount: 5,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  },
  {
    id: "stu-2",
    name: "Sidharth Sharma",
    email: "sidharth.sharma@cbit.edu",
    rollNumber: "2023-AI-018",
    department: "AI & Data Science",
    graduationYear: 2027,
    cgpa: "9.2",
    idVerificationStatus: "verified",
    placementStatus: "Placed",
    company: "WebShark Technologies",
    roleTag: "Admin",
    skills: ["Python", "PyTorch", "FastAPI", "MongoDB"],
    badgesCount: 4,
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop",
  },
  {
    id: "stu-3",
    name: "Reshma Varma",
    email: "reshma.varma@cbit.edu",
    rollNumber: "2023-IT-089",
    department: "Information Technology",
    graduationYear: 2027,
    cgpa: "9.1",
    idVerificationStatus: "verified",
    placementStatus: "Interviewing",
    company: "Razorpay Fintech",
    roleTag: "Contributor",
    skills: ["Next.js", "Docker", "AWS", "Express"],
    badgesCount: 3,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "stu-4",
    name: "Ananya Iyer",
    email: "ananya.iyer@cbit.edu",
    rollNumber: "2023-CS-104",
    department: "Computer Science",
    graduationYear: 2026,
    cgpa: "8.9",
    idVerificationStatus: "verified",
    placementStatus: "Placed",
    company: "Xphia Tech",
    roleTag: "Ambassador",
    skills: ["TypeScript", "Tailwind CSS", "GraphQL"],
    badgesCount: 3,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  },
  {
    id: "stu-5",
    name: "Arun Kumar",
    email: "arun.kumar@cbit.edu",
    rollNumber: "2024-ECE-055",
    department: "Electronics & Communication",
    graduationYear: 2028,
    cgpa: "8.4",
    idVerificationStatus: "pending",
    placementStatus: "Seeking",
    company: null,
    roleTag: "Regular",
    skills: ["Embedded C", "IoT", "Arduino"],
    badgesCount: 1,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: "stu-6",
    name: "Sneha Patel",
    email: "sneha.patel@cbit.edu",
    rollNumber: "2024-IT-031",
    department: "Information Technology",
    graduationYear: 2028,
    cgpa: "8.7",
    idVerificationStatus: "pending",
    placementStatus: "Seeking",
    company: null,
    roleTag: "Regular",
    skills: ["Java", "Spring Boot", "MySQL"],
    badgesCount: 2,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
  },
  {
    id: "stu-7",
    name: "Karthik Reddy",
    email: "karthik.reddy@cbit.edu",
    rollNumber: "2023-MECH-012",
    department: "Mechanical Engineering",
    graduationYear: 2027,
    cgpa: "7.9",
    idVerificationStatus: "verified",
    placementStatus: "Seeking",
    company: null,
    roleTag: "Regular",
    skills: ["SolidWorks", "AutoCAD", "MATLAB"],
    badgesCount: 1,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];

export default function CollegeStudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedVerification, setSelectedVerification] = useState("All");

  useEffect(() => {
    let isMounted = true;
    peopleService.list({ role: "student" }, initialStudents).then((res) => {
      if (isMounted && res && Array.isArray(res) && res.length > 0) {
        setStudents(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDept === "All" || student.department === selectedDept;
    const matchesStatus = selectedStatus === "All" || student.placementStatus === selectedStatus;
    const matchesVerification =
      selectedVerification === "All" || student.idVerificationStatus === selectedVerification;

    return matchesSearch && matchesDept && matchesStatus && matchesVerification;
  });

  const handleApprove = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, idVerificationStatus: "verified" } : s))
    );
  };

  const handleReject = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, idVerificationStatus: "rejected" } : s))
    );
  };

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
                <GraduationCap className="w-6 h-6 text-[#2b8a78]" />
                Student Roster & Verification
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Manage registered students, approve college IDs, and monitor certified skill achievements
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert("Student roster exported as CSV!")}
                className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors shadow-2xs inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by student name, roll number, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B9C93]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#4B9C93]"
              >
                <option value="All">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="AI & Data Science">AI & Data Science</option>
                <option value="Electronics & Communication">Electronics & Comm.</option>
                <option value="Mechanical Engineering">Mechanical Eng.</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#4B9C93]"
              >
                <option value="All">All Placement Statuses</option>
                <option value="Placed">Placed</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Seeking">Seeking</option>
              </select>

              <select
                value={selectedVerification}
                onChange={(e) => setSelectedVerification(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#4B9C93]"
              >
                <option value="All">All ID Statuses</option>
                <option value="verified">Verified ID</option>
                <option value="pending">Pending ID</option>
                <option value="rejected">Rejected ID</option>
              </select>
            </div>
          </div>

          {/* Student Table / Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Department & Roll</th>
                    <th className="py-3 px-4">CGPA</th>
                    <th className="py-3 px-4">Verified Badges</th>
                    <th className="py-3 px-4">Placement Status</th>
                    <th className="py-3 px-4">College ID Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No students found matching the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-9 h-9 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                                {student.name}
                                {student.roleTag && student.roleTag !== "Regular" && (
                                  <span className="px-1.5 py-0.2 rounded-full bg-teal-50 text-[#2b8a78] text-[9px] font-semibold border border-teal-200">
                                    {student.roleTag}
                                  </span>
                                )}
                              </p>
                              <p className="text-[11px] text-slate-400">{student.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-slate-800 text-xs">
                            {student.department}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {student.rollNumber} • Class of {student.graduationYear}
                          </p>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                            {student.cgpa}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {student.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="px-1.5 py-0.5 bg-teal-50 text-[#2b8a78] text-[10px] rounded-md font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                            {student.skills.length > 3 && (
                              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded-md">
                                +{student.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {student.placementStatus === "Placed" ? (
                            <div>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                                <CheckCircle2 className="w-3 h-3" /> Placed
                              </span>
                              <p className="text-[10px] text-slate-500 mt-0.5 font-medium truncate max-w-[130px]">
                                {student.company}
                              </p>
                            </div>
                          ) : student.placementStatus === "Interviewing" ? (
                            <div>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold">
                                <Clock className="w-3 h-3" /> In Process
                              </span>
                              <p className="text-[10px] text-slate-500 mt-0.5 font-medium truncate max-w-[130px]">
                                {student.company}
                              </p>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold">
                              Seeking Offer
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {student.idVerificationStatus === "verified" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                              ID Verified
                            </span>
                          ) : student.idVerificationStatus === "pending" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              ID Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-semibold">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              ID Rejected
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {student.idVerificationStatus === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(student.id)}
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[11px] font-semibold transition-colors"
                                  title="Approve Student ID"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(student.id)}
                                  className="px-2 py-1 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 rounded-md text-[11px] font-semibold transition-colors"
                                  title="Reject Student ID"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <Link
                              href="/student/chats"
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-[#2b8a78] hover:bg-teal-50 transition-colors"
                              title="Chat with Student"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </Link>
                            <Link
                              href="/people"
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                              title="View Portfolio"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
