import { redirect } from "next/navigation";

/**
 * Legacy guest route. Automatically redirects to public /people.
 */
export default function GuestPeopleRoute() {
  redirect("/people");
}
