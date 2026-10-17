"use client";

import React, { useState } from "react";
import Image from "next/image";
import { loginConfigs } from "../../../config/loginconfig";
import { 
  User, 
  Mail, 
  Lock, 
  Building2, 
  GraduationCap 
} from "lucide-react";

export default function LoginPage({ userType = "student" }) {
  const config = loginConfigs[userType] || loginConfigs.student;
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting login data:", formData);
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "user": return <User className="w-4 h-4 text-gray-400" />;
      case "email": return <Mail className="w-4 h-4 text-gray-400" />;
      case "lock": return <Lock className="w-4 h-4 text-gray-400" />;
      case "building": return <Building2 className="w-4 h-4 text-gray-400" />;
      default: return <User className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-0 lg:p-6">
      {/* Outer Encapsulating Teal Container */}
      <div className="w-full max-w-6xl bg-[#2b8a78] lg:rounded-3xl shadow-none lg:shadow-2xl flex flex-col lg:flex-row overflow-hidden min-h-[680px]">
        
        {/* Left Side: Teal Region with Centered Content */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-8 xl:p-12 relative">
          
          {/* Top Logo / Brand - Positioned left with alignment */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-[#2b8a78]" />
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">ShowMySkills</span>
          </div>

          {/* Center Content: Title, Subtitle, and Illustration fully centered */}
          <div className="my-auto text-center flex flex-col items-center justify-center py-4">
            <h2 className="text-white text-3xl font-extrabold mb-2 tracking-wide">
              {config.roleTitle}
            </h2>
            <p className="text-teal-100 text-sm max-w-xs font-medium leading-relaxed">
              {config.roleSubtitle}
            </p>

            {/* Laptop Viewport Image / Placeholder */}
            <div className="mt-8 relative w-full h-64 flex items-center justify-center">
              <Image 
                src={config.illustration} 
                alt={config.roleTitle}
                fill
                priority
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Bottom spacer balance */}
          <div className="h-6"></div>
        </div>

        {/* Right Side: White Form Card */}
        <div className="w-full lg:flex-1 bg-white lg:rounded-3xl p-8 sm:p-12 flex flex-col justify-center my-auto shadow-none lg:shadow-inner min-h-screen lg:min-h-0 lg:my-6 lg:mx-6">
          
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#2b8a78] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900 text-xl font-bold">ShowMySkills</span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Log In</h1>
            <p className="text-sm text-gray-400 mt-1">Welcome back to ShowMySkills</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {config.fields.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <label htmlFor={field.id} className="block text-xs font-semibold text-gray-700">
                  {field.label}
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    {renderIcon(field.icon)}
                  </div>
                  <input
                    type={field.type}
                    id={field.id}
                    required
                    placeholder={field.placeholder}
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2b8a78] focus:bg-white transition-all"
                  />
                </div>
              </div>
            ))}

            {/* Forgot Password Link */}
            <div className="flex justify-end pt-1">
              <a href="#forgot" className="text-xs text-red-500 font-semibold hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#00897b] hover:bg-[#00796b] text-white text-sm font-semibold rounded-xl shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2b8a78]"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-400 font-medium tracking-wider">Or continue with</span>
            </div>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.15 21.32 7.23 24 12 24z"/>
              <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.18C.43 8.12 0 9.83 0 12s.43 3.88 1.18 5.4l4.09-3.16z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.15 2.68 1.18 6.6l4.09 3.16c.95-2.85 3.6-4.96 6.73-4.96z"/>
            </svg>
            Sign in with Google
          </button>

          {/* Footer Signup Link */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <a href="#signup" className="text-[#00897b] font-semibold hover:underline">
              Sign Up
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}