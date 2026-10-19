"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const roleConfigs = {
  student: {
    title: "Student  Log In",
    tagline: "Show your skills. Discover your\nopportunities.",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. Asma Naureen",
    emailLabel: "Email Address",
    emailPlaceholder: "you@university.edu",
    illustration: "https://api.builder.io/api/v1/image/assets/TEMP/a3a7853a2cc6a5bd5072628fd38b959d0f272e5a?width=1066",
    dashboardRoute: "/student/internships",
  },
  company: {
    title: "Company Log In",
    tagline: "Find the talent that brings your\nnext big idea to life.",
    nameLabel: "Company Name",
    namePlaceholder: "e.g. xphy company",
    emailLabel: "Office Email Address",
    emailPlaceholder: "you@company.com",
    illustration: "https://api.builder.io/api/v1/image/assets/TEMP/0a67d99783949b6ccf1bb5793dd05c0cb28f8899?width=964",
    dashboardRoute: "/company/dashboard",
  },
  college: {
    title: "College Log In",
    tagline: "Improve placement outcomes with\nshowmyskills",
    nameLabel: "College Name",
    namePlaceholder: "e.g. CBIT College",
    emailLabel: "College Email Address",
    emailPlaceholder: "you@university.edu",
    illustration: "https://api.builder.io/api/v1/image/assets/TEMP/e1b6e7e45b78e909b5d732ae1618fa90b05ff421?width=940",
    dashboardRoute: "/admin/dashboard",
  },
};

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") || "student";
  
  const [activeRole, setActiveRole] = useState(
    roleConfigs[initialRole] ? initialRole : "student"
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const config = roleConfigs[activeRole];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push(config.dashboardRoute);
    }, 600);
  };

  return (
    <div className="w-full max-w-[1284px] min-h-[836px] rounded-[36px] sm:rounded-[50px] lg:rounded-[70px] bg-[#4B9C93] p-6 sm:p-10 lg:p-12 relative flex flex-col lg:flex-row items-center justify-between shadow-2xl overflow-hidden my-4">
      {/* ──── Left Side: Branding & Role Illustration ──── */}
      <div className="w-full lg:w-[460px] flex flex-col justify-between self-stretch z-10 py-2 lg:py-6">
        <div>
          {/* Logo & Platform Name */}
          <Link href="/" className="inline-flex items-center gap-4 group mb-8">
            <img
              src="/logo.png"
              alt="ShowMySkills Logo"
              className="w-14 sm:w-[70px] h-auto object-contain"
            />
            <span className="text-white font-bold text-3xl sm:text-4xl tracking-tight">
              ShowMySkills
            </span>
          </Link>

          {/* Dynamic Headings */}
          <div className="mb-6">
            <h1 className="text-white font-bold text-2xl sm:text-3xl lg:text-[30px] leading-tight mb-2">
              {config.title}
            </h1>
            <p className="text-white/95 font-medium text-base sm:text-lg lg:text-[20px] leading-relaxed whitespace-pre-line">
              {config.tagline}
            </p>
          </div>
        </div>

        {/* Illustration with Subtle Shadow Ellipse */}
        <div className="relative w-full max-w-[460px] mx-auto mt-auto pt-6 flex flex-col items-center">
          <img
            src={config.illustration}
            alt={`${activeRole} illustration`}
            className="w-full max-h-[330px] object-contain drop-shadow-md relative z-10"
          />
          {/* Bottom Ellipse Shadow */}
          <div className="w-[85%] h-4 bg-black/15 rounded-full blur-[8px] mt-[-10px] z-0" />
        </div>
      </div>

      {/* ──── Right Side: Floating White Form Card ──── */}
      <div className="w-full lg:w-[672px] min-h-[740px] rounded-[32px] sm:rounded-[42px] bg-white shadow-[16px_20px_63.8px_rgba(0,0,0,0.25)] p-6 sm:p-10 lg:p-12 relative flex flex-col justify-between mt-8 lg:mt-0 z-20">
        {/* Top Header Row with Back Button & Role Switcher */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <Link
            href="/"
            className="w-[38px] h-[38px] rounded-full border border-[#C9C9C9] bg-white hover:bg-gray-50 flex items-center justify-center shrink-0 transition-colors shadow-xs"
            aria-label="Back to Home"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 5C8.7 8.4 7.3 9.5 7.1 9.7L7 10C7.3 10.3 8.7 11.6 12.5 15" stroke="#4A9990" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Role Switcher Pill Tabs */}
          <div className="flex items-center bg-gray-100/80 p-1 rounded-full text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveRole("student")}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeRole === "student"
                  ? "bg-[#4B9C93] text-white shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setActiveRole("company")}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeRole === "company"
                  ? "bg-[#4B9C93] text-white shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Company
            </button>
            <button
              type="button"
              onClick={() => setActiveRole("college")}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeRole === "college"
                  ? "bg-[#4B9C93] text-white shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              College / Admin
            </button>
          </div>
        </div>

        {/* Card Title & Subtitle */}
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-[32px] font-bold text-gray-900">
            Log In
          </h2>
          <p className="text-sm sm:text-base text-[#4A5565]/80 font-medium mt-1">
            Welcome back to ShowMySkills
          </p>
        </div>

        {/* Form Inputs Grid */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Field 1: Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#1F2937]">
              {config.nameLabel}
            </label>
            <div className="flex items-center h-[44px] px-3.5 rounded-lg border border-[#DADADA] bg-[#F9FAFB] focus-within:border-[#4B9C93] focus-within:bg-white transition-all">
              {activeRole === "student" ? (
                <svg className="w-4 h-4 text-[#4A5565] shrink-0 opacity-80" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6672 14V12.6667C12.6672 11.9594 12.3862 11.2811 11.886 10.781C11.3859 10.281 10.7075 10 10.0002 10H5.99974C5.29241 10 4.61406 10.281 4.1139 10.781C3.61375 11.2811 3.33276 11.9594 3.33276 12.6667V14M10.6669 4.66667C10.6669 6.13943 9.47289 7.33333 7.99996 7.33333C6.52704 7.33333 5.33299 6.13943 5.33299 4.66667C5.33299 3.19391 6.52704 2 7.99996 2C9.47289 2 10.6669 3.19391 10.6669 4.66667Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#4A5565] shrink-0 opacity-80" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 14V4H6V14H2Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M10 14V4H14V14H10Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M6 14V2H10V14H6Z" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )}
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={config.namePlaceholder}
                className="w-full bg-transparent pl-2.5 text-sm text-[#1F2937] placeholder:text-[#4A5565]/80 focus:outline-none"
              />
            </div>
          </div>

          {/* Field 2: Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#1F2937]">
              {config.emailLabel}
            </label>
            <div className="flex items-center h-[44px] px-3.5 rounded-lg border border-[#DADADA] bg-[#F9FAFB] focus-within:border-[#4B9C93] focus-within:bg-white transition-all">
              <svg className="w-4 h-4 text-[#4A5565] shrink-0 opacity-80" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6672 4.66704L8.67268 8.48465C8.46926 8.60278 8.23821 8.66501 8.00296 8.66501C7.76772 8.66501 7.53666 8.60278 7.33324 8.48465L1.33276 4.66704M14.6672 4.66704V4.00044C14.6672 3.26413 14.0702 2.66724 13.3337 2.66724H2.6662C1.92977 2.66724 1.33276 3.26413 1.33276 4.00044V4.66704M14.6672 4.66704V11.9996C14.6672 12.7359 14.0702 13.3328 13.3337 13.3328H2.6662C1.92977 13.3328 1.33276 12.7359 1.33276 11.9996V4.66704" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={config.emailPlaceholder}
                className="w-full bg-transparent pl-2.5 text-sm text-[#1F2937] placeholder:text-[#4A5565]/80 focus:outline-none"
              />
            </div>
          </div>

          {/* Field 3: Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#1F2937]">
              Password
            </label>
            <div className="flex items-center h-[44px] px-3.5 rounded-lg border border-[#DADADA] bg-[#F9FAFB] focus-within:border-[#4B9C93] focus-within:bg-white transition-all">
              <svg className="w-4 h-4 text-[#4A5565] shrink-0 opacity-80" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66667 7.33324V4.66636C4.66667 3.78224 5.01786 2.93432 5.64298 2.30915C6.2681 1.68398 7.11595 1.33276 8 1.33276C8.88406 1.33276 9.7319 1.68398 10.357 2.30915C10.9821 2.93432 11.3333 3.78224 11.3333 4.66636V7.33324M4.66667 7.33324H3.33333C2.59695 7.33324 2 7.93025 2 8.66668V13.3337C2 14.0702 2.59695 14.6672 3.33333 14.6672H12.6667C13.403 14.6672 14 14.0702 14 13.3337V8.66668C14 7.93025 13.403 7.33324 12.6667 7.33324H11.3333M4.66667 7.33324H11.3333" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent pl-2.5 text-sm text-[#1F2937] placeholder:text-[#4A5565]/80 focus:outline-none"
              />
            </div>
            {/* Forgot Password Link */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="text-xs sm:text-sm font-medium text-[#A10C00] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

          {/* Submit Log In Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              id="login-submit-btn"
              className="w-full h-[46px] rounded-xl bg-[#009689] hover:bg-[#007e73] active:scale-[0.99] text-white font-bold text-base shadow-sm transition-all cursor-pointer flex items-center justify-center disabled:opacity-70"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#D1D5DC]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-[#6A7282] font-normal">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google SSO Button */}
        <button
          type="button"
          onClick={() => router.push(config.dashboardRoute)}
          className="w-full h-[48px] rounded-xl border border-[#D1D5DC] bg-white hover:bg-gray-50 flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-2xs"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99993 3.95833C11.4749 3.95833 12.6499 4.47083 13.4541 4.9L16.0291 2.325C14.5333 0.8875 12.4208 0 9.99993 0C6.09993 0 2.6666 2.35 1.0166 5.77917L4.18743 8.24583C5.0541 5.47083 7.3166 3.95833 9.99993 3.95833Z" fill="#4285F4" />
            <path d="M19.2083 10.2084C19.2083 9.52508 19.1458 8.86675 19.025 8.22925H10V11.9792H15.1833C14.9583 13.1334 14.275 14.1126 13.2458 14.7709L16.2583 17.1126C18.325 15.4709 19.2083 13.0542 19.2083 10.2084Z" fill="#34A853" />
            <path d="M4.1875 11.9958C3.71667 10.5917 3.71667 8.99168 4.1875 7.58752L1.01667 5.12085C0.358333 7.02918 0 8.57085 0 10.2083C0 11.8458 0.358333 13.3875 1.01667 14.8792L4.1875 12.4125V11.9958Z" fill="#FBBC05" />
            <path d="M9.99993 19.9999C12.6999 19.9999 14.9708 19.1124 16.6374 17.5499L13.6249 15.2082C12.7874 15.7707 11.7124 16.1041 9.99993 16.1041C7.3166 16.1041 5.0541 14.5916 4.18743 12.6499L1.0166 15.1166C2.6666 17.6499 6.09993 19.9999 9.99993 19.9999Z" fill="#EA4335" />
          </svg>
          <span className="text-sm font-medium text-[#005F5A]">
            Sign in with Google
          </span>
        </button>

        {/* Bottom Toggle Link to Signup */}
        <div className="text-center pt-4">
          <Link
            href={`/signup?role=${activeRole}`}
            className="text-sm text-[#009689] hover:underline"
          >
            <span className="font-medium text-[#009689]">Don’t have an account? </span>
            <span className="font-bold text-[#009689]">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-[#4B9C93] font-bold p-8">Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}