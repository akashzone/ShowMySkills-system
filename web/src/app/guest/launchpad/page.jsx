import { redirect } from "next/navigation";

/**
 * Legacy guest route. Automatically redirects to public /launchpad.
 */
export default function GuestLaunchpadRoute() {
  redirect("/launchpad");
}
