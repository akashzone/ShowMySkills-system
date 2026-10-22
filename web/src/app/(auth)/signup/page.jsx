"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const signupRoleConfigs = {
  student: {
    title: "Student Sign up",
    tagline: "Create your account and start your\nskills with showmyskills",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. Asma Naureen",
    emailLabel: "Email Address",
    emailPlaceholder: "you@university.edu",
    hasWebsite: false,
    illustration: "/Signup/Student.png",
    dashboardRoute: "/student/internships",
  },
  company: {
    title: "Company Sign up",
    tagline: "Select the candidates as per your\nrequirements with showmyskills",
    nameLabel: "Company Name",
    namePlaceholder: "e.g. xphy company",
    emailLabel: "Office Email Address",
    emailPlaceholder: "you@company.com",
    hasWebsite: true,
    websitePlaceholder: "e.g. https://xphycompany.com",
    illustration: "/Signup/Company.png",
    dashboardRoute: "/company/dashboard",
  },
  admin: {
    title: "Admin Sign up",
    tagline: "Manage your platform and outcomes\nwith showmyskills",
    nameLabel: "Admin Name",
    namePlaceholder: "e.g. System Administrator",
    emailLabel: "Admin Email Address",
    emailPlaceholder: "admin@showmyskills.com",
    hasWebsite: false,
    illustration: "/Signup/Admin.png",
    dashboardRoute: "/admin/dashboard",
  },
};

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") || "student";

  const [activeRole, setActiveRole] = useState(
    signupRoleConfigs[initialRole] ? initialRole : "student"
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const config = signupRoleConfigs[activeRole];

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(config.dashboardRoute);
    }, 600);
  };

  return (
    <div className="w-full max-w-[1240px] bg-[#4B9C93] relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
      {/* ──── Left Side: Branding & Illustration ──── */}
      <div className="w-full lg:w-[440px] flex flex-col justify-between self-stretch z-10 py-2">
        <div>
          <Link href="/" className="inline-flex items-center gap-3.5 group mb-6">
            <img
              src="/logo.png"
              alt="ShowMySkills Logo"
              className="w-12 sm:w-[60px] h-auto object-contain"
            />
            <span className="text-white font-bold text-2xl sm:text-3xl tracking-tight">
              ShowMySkills
            </span>
          </Link>

          <div className="mb-4">
            <h1 className="text-white font-bold text-2xl sm:text-3xl lg:text-[28px] leading-tight mb-2">
              {config.title}
            </h1>
            <p className="text-white/95 font-medium text-sm sm:text-base lg:text-[17px] leading-relaxed whitespace-pre-line">
              {config.tagline}
            </p>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative w-full max-w-[420px] mx-auto mt-auto pt-2 flex flex-col items-center">
          <img
            src={config.illustration}
            alt={`${activeRole} illustration`}
            className="w-full max-h-[350px] object-contain drop-shadow-md relative z-10"
          />
          <div className="w-[85%] h-3 bg-black/15 rounded-full blur-[6px] mt-[-8px] z-0" />
        </div>
      </div>

      {/* ──── Right Side: Floating White Signup Card ──── */}
      <div className="w-full lg:w-[620px] rounded-[28px] sm:rounded-[36px] bg-white shadow-[16px_20px_50px_rgba(0,0,0,0.18)] p-6 sm:p-8 lg:p-10 relative flex flex-col justify-between z-20">
        {/* Top Header Row with Back Button & Role Switcher */}
        <div className="flex items-center justify-between gap-4 mb-2">


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
              onClick={() => setActiveRole("admin")}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeRole === "admin"
                  ? "bg-[#4B9C93] text-white shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Card Title & Subtitle */}
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-[32px] font-bold text-gray-900">
            Sign up
          </h2>
          <p className="text-sm sm:text-base text-[#4A5565]/80 font-medium mt-0.5">
            Create your account
          </p>
        </div>

        {/* Form Inputs Grid */}
        <form onSubmit={handleSignup} className="space-y-3.5">
          {/* Field 1: Name */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-semibold text-[#1F2937]">
              {config.nameLabel}
            </label>
            <div className="flex items-center h-[42px] px-3.5 rounded-lg border border-[#DADADA] bg-[#F9FAFB] focus-within:border-[#4B9C93] focus-within:bg-white transition-all">
              <svg className="w-4 h-4 text-[#4A5565] shrink-0 opacity-80" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6672 14V12.6667C12.6672 11.9594 12.3862 11.2811 11.886 10.781C11.3859 10.281 10.7075 10 10.0002 10H5.99974C5.29241 10 4.61406 10.281 4.1139 10.781C3.61375 11.2811 3.33276 11.9594 3.33276 12.6667V14M10.6669 4.66667C10.6669 6.13943 9.47289 7.33333 7.99996 7.33333C6.52704 7.33333 5.33299 6.13943 5.33299 4.66667C5.33299 3.19391 6.52704 2 7.99996 2C9.47289 2 10.6669 3.19391 10.6669 4.66667Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={config.namePlaceholder}
                className="w-full bg-transparent pl-2.5 text-xs sm:text-sm text-[#1F2937] placeholder:text-[#4A5565]/80 focus:outline-none"
              />
            </div>
          </div>

          {/* Field 2: Email */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-semibold text-[#1F2937]">
              {config.emailLabel}
            </label>
            <div className="flex items-center h-[42px] px-3.5 rounded-lg border border-[#DADADA] bg-[#F9FAFB] focus-within:border-[#4B9C93] focus-within:bg-white transition-all">
              <svg className="w-4 h-4 text-[#4A5565] shrink-0 opacity-80" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6672 4.66704L8.67268 8.48465C8.46926 8.60278 8.23821 8.66501 8.00296 8.66501C7.76772 8.66501 7.53666 8.60278 7.33324 8.48465L1.33276 4.66704M14.6672 4.66704V4.00044C14.6672 3.26413 14.0702 2.66724 13.3337 2.66724H2.6662C1.92977 2.66724 1.33276 3.26413 1.33276 4.00044V4.66704M14.6672 4.66704V11.9996C14.6672 12.7359 14.0702 13.3328 13.3337 13.3328H2.6662C1.92977 13.3328 1.33276 12.7359 1.33276 11.9996V4.66704" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={config.emailPlaceholder}
                className="w-full bg-transparent pl-2.5 text-xs sm:text-sm text-[#1F2937] placeholder:text-[#4A5565]/80 focus:outline-none"
              />
            </div>
          </div>

          {/* Field 3: Phone Number */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-semibold text-[#1F2937]">
              Phone Number
            </label>
            <div className="flex items-center h-[42px] px-3.5 rounded-lg border border-[#DADADA] bg-[#F9FAFB] focus-within:border-[#4B9C93] focus-within:bg-white transition-all">
              <svg className="w-4 h-4 text-[#4A5565] shrink-0 opacity-80" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.2214 11.0458C9.35909 11.109 9.51422 11.1235 9.66122 11.0867C9.80823 11.05 9.93834 10.9643 10.0301 10.8438L10.2668 10.5337C10.391 10.3681 10.5521 10.2337 10.7372 10.1411C10.9224 10.0486 11.1266 10.0004 11.3336 10.0004H13.3337C13.6874 10.0004 14.0265 10.1409 14.2766 10.3909C14.5267 10.641 14.6672 10.9802 14.6672 11.3338V13.334C14.6672 13.6876 14.5267 14.0268 14.2766 14.2769C14.0265 14.5269 13.6874 14.6674 13.3337 14.6674C10.1509 14.6674 7.09838 13.403 4.84776 11.1524C2.59715 8.90179 1.33276 5.8493 1.33276 2.66645C1.33276 2.3128 1.47325 1.97363 1.72332 1.72356C1.97339 1.47349 2.31255 1.33301 2.6662 1.33301H4.66636C5.02001 1.33301 5.35918 1.47349 5.60925 1.72356C5.85932 1.97363 5.9998 2.3128 5.9998 2.66645V4.66661C5.9998 4.87362 5.95161 5.07779 5.85903 5.26294C5.76645 5.4481 5.63204 5.60915 5.46643 5.73336L5.1544 5.96738C5.032 6.06084 4.94573 6.19379 4.91024 6.34364C4.87476 6.4935 4.89224 6.65102 4.95972 6.78944C5.87091 8.64017 7.36953 10.1369 9.2214 11.0458Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-transparent pl-2.5 text-xs sm:text-sm text-[#1F2937] placeholder:text-[#4A5565]/80 focus:outline-none"
              />
            </div>
          </div>

          {/* Optional Field: Website Link (for Company/College) */}
          {config.hasWebsite && (
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-semibold text-[#1F2937]">
                Website Link
              </label>
              <div className="flex items-center h-[42px] px-3.5 rounded-lg border border-[#DADADA] bg-[#F9FAFB] focus-within:border-[#4B9C93] focus-within:bg-white transition-all">
                <svg className="w-4 h-4 text-[#4A5565] shrink-0 opacity-80" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M2 8H14" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 2C9.5 4 10.5 6 10.5 8C10.5 10 9.5 12 8 14C6.5 12 5.5 10 5.5 8C5.5 6 6.5 4 8 2Z" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder={config.websitePlaceholder}
                  className="w-full bg-transparent pl-2.5 text-xs sm:text-sm text-[#1F2937] placeholder:text-[#4A5565]/80 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Password & Confirm Password Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-semibold text-[#1F2937]">
                Password
              </label>
              <div className="flex items-center h-[42px] px-3 rounded-lg border border-[#DADADA] bg-[#F9FAFB] focus-within:border-[#4B9C93] focus-within:bg-white transition-all">
                <svg className="w-3.5 h-3.5 text-[#4A5565] shrink-0 opacity-80" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.66667 7.33324V4.66636C4.66667 3.78224 5.01786 2.93432 5.64298 2.30915C6.2681 1.68398 7.11595 1.33276 8 1.33276C8.88406 1.33276 9.7319 1.68398 10.357 2.30915C10.9821 2.93432 11.3333 3.78224 11.3333 4.66636V7.33324M4.66667 7.33324H3.33333C2.59695 7.33324 2 7.93025 2 8.66668V13.3337C2 14.0702 2.59695 14.6672 3.33333 14.6672H12.6667C13.403 14.6672 14 14.0702 14 13.3337V8.66668C14 7.93025 13.403 7.33324 12.6667 7.33324H11.3333M4.66667 7.33324H11.3333" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent pl-2 text-xs sm:text-sm text-[#1F2937] placeholder:text-[#4A5565]/80 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-semibold text-[#1F2937]">
                Confirm Password
              </label>
              <div className="flex items-center h-[42px] px-3 rounded-lg border border-[#DADADA] bg-[#F9FAFB] focus-within:border-[#4B9C93] focus-within:bg-white transition-all">
                <svg className="w-3.5 h-3.5 text-[#4A5565] shrink-0 opacity-80" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.66667 7.33324V4.66636C4.66667 3.78224 5.01786 2.93432 5.64298 2.30915C6.2681 1.68398 7.11595 1.33276 8 1.33276C8.88406 1.33276 9.7319 1.68398 10.357 2.30915C10.9821 2.93432 11.3333 3.78224 11.3333 4.66636V7.33324M4.66667 7.33324H3.33333C2.59695 7.33324 2 7.93025 2 8.66668V13.3337C2 14.0702 2.59695 14.6672 3.33333 14.6672H12.6667C13.403 14.6672 14 14.0702 14 13.3337V8.66668C14 7.93025 13.403 7.33324 12.6667 7.33324H11.3333M4.66667 7.33324H11.3333" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent pl-2 text-xs sm:text-sm text-[#1F2937] placeholder:text-[#4A5565]/80 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

          {/* Submit Sign Up Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              id="signup-submit-btn"
              className="w-full h-[46px] rounded-xl bg-[#009689] hover:bg-[#007e73] active:scale-[0.99] text-white font-bold text-base shadow-sm transition-all cursor-pointer flex items-center justify-center disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-3">
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
          className="w-full h-[46px] rounded-xl border border-[#D1D5DC] bg-white hover:bg-gray-50 flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-2xs"
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

        {/* Bottom Toggle Link to Login */}
        <div className="text-center pt-3">
          <Link
            href={`/login?role=${activeRole}`}
            className="text-sm text-[#009689] hover:underline"
          >
            <span className="font-medium text-[#009689]">Already have an account? </span>
            <span className="font-bold text-[#009689]">Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="text-[#4B9C93] font-bold p-8">Loading...</div>}>
      <SignupFormContent />
    </Suspense>
  );
}
