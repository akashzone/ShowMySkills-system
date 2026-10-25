"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ProfileHeader from "@/features/profile/ProfileHeader";
import CompletionBanner from "@/features/profile/CompletionBanner";
import ReputationCard from "@/features/profile/ReputationCard";
import AboutCard from "@/features/profile/AboutCard";
import SkillsCard from "@/features/profile/SkillsCard";
import ProjectsCard from "@/features/profile/ProjectsCard";
import { studentProfileData } from "@/features/profile/mockData";
import { authService } from "@/services/apiClient";

/**
 * StudentProfilePage — Task STU-02 - Student Profile View.
 *
 * Follows the same Sidebar + Header + Content layout pattern
 * established by the Internships page. Renders data-driven
 * profile cards from studentProfileData mock.
 */
export default function StudentProfilePage() {
  const [data, setData] = useState(studentProfileData);

  useEffect(() => {
    let isMounted = true;
    authService.getCurrentUser(null).then((user) => {
      if (isMounted && user) {
        setData((prev) => ({
          ...prev,
          name: user.name || prev.name,
          title: user.title || user.headline || prev.title,
          college: user.college || prev.college,
          location: user.location || prev.location,
          aboutText: user.bio || prev.aboutText,
          skillsList:
            user.skills && Array.isArray(user.skills) && user.skills.length > 0
              ? user.skills.map((s) => (typeof s === "string" ? { name: s, level: "advanced" } : s))
              : prev.skillsList,
        }));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9F9] flex">
      {/* ──── Left Sidebar ──── */}
      <DashboardSidebar />

      {/* ──── Main Content Area ──── */}
      <div className="flex-1 md:ml-[220px] ml-0 flex flex-col min-h-screen">
        {/* ──── Top Header Bar ──── */}
        <DashboardHeader />

        {/* ──── Scrollable Content ──── */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
          <div className="max-w-[900px] mx-auto space-y-5">
            {/* Profile Identity Card */}
            <ProfileHeader data={data} />

            {/* Profile Completion Progress */}
            <CompletionBanner percentage={data.completionPercentage} />

            {/* Skill Reputation Score */}
            <ReputationCard data={data} />

            {/* About */}
            <AboutCard text={data.aboutText} />

            {/* Skills */}
            <SkillsCard skills={data.skillsList} />

            {/* Projects */}
            <ProjectsCard projects={data.projectsList} />
          </div>
        </main>
      </div>
    </div>
  );
}
