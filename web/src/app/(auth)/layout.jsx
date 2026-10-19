export default function AuthLayout({ children }) {
  return (
    <div className="auth-wrapper bg-[#F7F9F9] min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans">
      {children}
    </div>
  );
}
