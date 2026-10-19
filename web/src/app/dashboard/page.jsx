import { redirect } from "next/navigation";

/**
 * /dashboard root route redirects to default student route (/student/internships).
 */
export default function DashboardRoute() {
  redirect("/student/internships");
}
