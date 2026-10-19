import { redirect } from "next/navigation";

/**
 * /guest root route. Automatically redirects to public /people.
 */
export default function GuestRoute() {
  redirect("/people");
}
