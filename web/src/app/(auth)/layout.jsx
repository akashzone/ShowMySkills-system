export default function AuthLayout({ children }) {
  return (
    <div className="auth-wrapper bg-[#4B9C93] min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">
      {children}
    </div>
  );
}
