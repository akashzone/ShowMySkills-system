import { redirect } from "next/navigation";

/**
 * /student/dashboard is replaced by /student/internships as the default student route.
 * Automatically redirect any traffic here directly to /student/internships.
 */
export default function StudentDashboardPage() {
  redirect("/student/internships");
}
