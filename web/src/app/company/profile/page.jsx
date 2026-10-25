"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  Calendar,
  Users,
  Award,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Edit3,
  ArrowRight,
  Heart,
  Share2,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { authService, apiRequest } from "@/services/apiClient";

const initialCompanyData = {
  name: "WebShark Technologies & Solutions",
  tagline: "Pioneering intelligent fintech & web architecture systems for global enterprises",
  logo: "https://api.builder.io/api/v1/image/assets/TEMP/5a82e47de052e6b1e8a0daf000f4c7f2631701fe?width=180",
  verified: true,
  establishedYear: 2021,
  industry: "Information Technology & Software Services",
  companySize: "51-200 Employees",
  location: "Bengaluru, Karnataka, India (Hybrid)",
  website: "https://webshark.io",
  email: "recruitment@webshark.io",
  phone: "+91 80 4123 9870",
  about:
    "WebShark is an engineering-first technology organization creating high-scale SaaS products, real-time data pipelines, and design systems. We actively collaborate with leading colleges across India to recruit the brightest student talent and offer high-impact engineering internships.",
  stats: [
    { label: "Active Postings", value: "3 Roles" },
    { label: "Interns Hired", value: "48 Candidates" },
    { label: "PPO Conversion", value: "85% Rate" },
    { label: "Rating", value: "4.9 / 5.0" },
  ],
  techStack: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "Tailwind CSS",
    "Python",
  ],
  perks: [
    { title: "Competitive Stipend", desc: "Top 10 percentile stipends with monthly milestone bonuses." },
    { title: "Mentorship by Staff Engineers", desc: "Weekly 1-on-1 engineering syncs & architecture reviews." },
    { title: "Modern Tech Setup", desc: "Latest MacBook Pro M3 and home workspace equipment allowance." },
    { title: "PPO Path", desc: "Direct pre-placement full-time offer consideration upon completion." },
    { title: "Flexible Schedule", desc: "Core working hours with college exam preparation leaves." },
    { title: "Learning Budget", desc: "₹30,000 annual allowance for courses, books, and tech conferences." },
  ],
  activeJobs: [
    {
      id: "int-001",
      title: "UI/UX Product Design Intern",
      type: "Full-time Internship",
      stipend: "₹20,000 - ₹25,000 / mo",
      duration: "6 Months",
      applicants: 42,
      location: "Bengaluru (Hybrid)",
    },
    {
      id: "int-002",
      title: "Frontend Engineering Intern (React/Next.js)",
      type: "Full-time Internship",
      stipend: "₹25,000 - ₹30,000 / mo",
      duration: "3-6 Months",
      applicants: 89,
      location: "Remote",
    },
    {
      id: "int-004",
      title: "Backend Platform Intern (Node.js/PostgreSQL)",
      type: "Full-time Internship",
      stipend: "₹25,000 - ₹35,000 / mo",
      duration: "6 Months",
      applicants: 53,
      location: "Bengaluru / Remote",
    },
  ],
  awards: [
    {
      name: "Top Emerging Tech Employer 2025",
      issuer: "National Startup & Tech Council",
      year: 2025,
    },
    {
      name: "ISO 27001 Certified Security Standards",
      issuer: "British Standards Institution",
      year: 2024,
    },
    {
      name: "Great Place to Work — Certified",
      issuer: "GPTW Institute",
      year: 2025,
    },
  ],
};

export default function CompanyProfilePage() {
  const [company, setCompany] = useState(initialCompanyData);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: company.name,
    tagline: company.tagline,
    location: company.location,
    website: company.website,
    email: company.email,
    phone: company.phone,
    about: company.about,
  });

  useEffect(() => {
    let isMounted = true;
    authService.getCurrentUser(null).then((user) => {
      if (isMounted && user) {
        setCompany((prev) => ({
          ...prev,
          name: user.name || prev.name,
          email: user.email || prev.email,
          location: user.location || prev.location,
          website: user.website || prev.website,
          about: user.bio || prev.about,
        }));
        setFormData((prev) => ({
          ...prev,
          name: user.name || prev.name,
          email: user.email || prev.email,
          location: user.location || prev.location,
          website: user.website || prev.website,
          about: user.bio || prev.about,
        }));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setCompany((prev) => ({
      ...prev,
      ...formData,
    }));
    setIsEditing(false);
    setEditSuccess(true);
    try {
      await apiRequest("/auth/me", "PUT", formData);
    } catch {}
    setTimeout(() => setEditSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F9] flex">
      <DashboardSidebar />

      <div className="flex-1 md:ml-[220px] ml-0 flex flex-col min-h-screen relative">
        <DashboardHeader
          title="Company Profile"
          subtitle="Manage your public organization persona, culture showcase, and internship offerings"
        />

        <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* Banner Header Card */}
          <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
            {/* Gradient Top Banner */}
            <div className="h-44 sm:h-52 bg-gradient-to-r from-[#4B9C93] via-[#3d867e] to-[#255e57] relative p-6 flex items-start justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Verified Enterprise Partner</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-gray-800 text-xs sm:text-sm font-semibold shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-[#4B9C93]" />
                  <span>{isEditing ? "Cancel Editing" : "Edit Profile"}</span>
                </button>
              </div>
            </div>

            {/* Profile Bar */}
            <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-14">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                {/* Logo Box */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white p-2 shadow-lg border border-gray-100 flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#E6F7F3] to-teal-50 border border-[#4B9C93]/20 flex flex-col items-center justify-center text-[#4B9C93]">
                    <Building2 className="w-12 h-12" />
                    <span className="text-[10px] font-bold tracking-wider mt-1 uppercase text-[#4B9C93]/90">
                      Partner
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                      {company.name}
                    </h1>
                    {company.verified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 max-w-2xl">{company.tagline}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-medium text-gray-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#4B9C93]" />
                      {company.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#4B9C93]" />
                      {company.companySize}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#4B9C93]" />
                      Est. {company.establishedYear}
                    </span>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[#4B9C93] hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      {company.website.replace("https://", "")}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/company/applications"
                  className="px-5 py-2.5 rounded-2xl bg-[#4B9C93] hover:bg-[#3d867e] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  View All Candidates
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="border-t border-gray-100 bg-gray-50/70 grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100 py-3.5 px-6">
              {company.stats.map((st, i) => (
                <div key={i} className="text-center py-1">
                  <p className="text-base sm:text-lg font-extrabold text-gray-900">{st.value}</p>
                  <p className="text-xs text-gray-500 font-medium">{st.label}</p>
                </div>
              ))}
            </div>
          </div>

          {editSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Company profile details updated successfully!
            </div>
          )}

          {/* Edit Form Modal/Drawer if editing */}
          {isEditing && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#4B9C93]/30 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#4B9C93]" />
                Update Organization Profile
              </h3>
              <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4B9C93]"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-700">Tagline / Mission</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4B9C93]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4B9C93]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4B9C93]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Recruitment Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4B9C93]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4B9C93]"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-700">About Company</label>
                  <textarea
                    rows={4}
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4B9C93]"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#4B9C93] hover:bg-[#3d867e] text-white text-xs font-bold shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto pb-1">
            {[
              { id: "overview", label: "Overview & Culture" },
              { id: "postings", label: `Active Openings (${company.activeJobs.length})` },
              { id: "perks", label: "Perks & Mentorship" },
              { id: "awards", label: "Certifications & Awards" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#4B9C93] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">About Our Company</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {company.about}
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">Primary Technology Stack</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {company.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-[#E6F7F3] text-[#0D9488] font-bold text-xs border border-[#0D9488]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                    Contact & Hiring Team
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#4B9C93]" />
                      <a href={`mailto:${company.email}`} className="hover:underline">
                        {company.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#4B9C93]" />
                      <span>{company.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-[#4B9C93]" />
                      <a href={company.website} target="_blank" rel="noreferrer" className="hover:underline">
                        {company.website}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#E6F7F3] to-teal-50 rounded-3xl p-6 border border-[#4B9C93]/20 space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4B9C93] text-white flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">Need Help Hiring?</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Our campus relations team can connect your job postings directly with top engineering colleges across India.
                  </p>
                  <Link
                    href="/help"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#4B9C93] hover:underline"
                  >
                    Contact Partner Support <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Postings */}
          {activeTab === "postings" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Current Open Internships</h3>
                <Link
                  href="/company/dashboard"
                  className="px-4 py-2 rounded-xl bg-[#4B9C93] hover:bg-[#3d867e] text-white text-xs font-bold transition-all"
                >
                  Post Another Role
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {company.activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:border-[#4B9C93]/40 transition-all"
                  >
                    <div className="space-y-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6F7F3] text-[#0D9488]">
                        {job.type}
                      </span>
                      <h4 className="font-extrabold text-base text-gray-900">{job.title}</h4>
                      <p className="text-xs text-gray-500">{job.location} · {job.duration}</p>
                      <p className="text-xs font-bold text-[#4B9C93] pt-1">{job.stipend}</p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">
                        <strong className="text-gray-900">{job.applicants}</strong> applicants
                      </span>
                      <Link
                        href={`/company/applications?role=${encodeURIComponent(job.title)}`}
                        className="text-xs font-bold text-[#4B9C93] hover:underline flex items-center gap-1"
                      >
                        Manage <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Perks */}
          {activeTab === "perks" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {company.perks.map((perk, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#E6F7F3] text-[#0D9488] flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">{perk.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Awards */}
          {activeTab === "awards" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {company.awards.map((award, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">{award.name}</h4>
                  <p className="text-xs text-gray-500">Issued by {award.issuer} ({award.year})</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
