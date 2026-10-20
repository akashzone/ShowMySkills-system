import { redirect } from "next/navigation";

/**
 * Legacy guest route. Automatically redirects to public /internships.
 */
export default function GuestInternshipsRoute() {
  redirect("/internships");
}
