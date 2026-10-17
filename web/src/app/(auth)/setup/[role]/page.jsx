import { notFound } from "next/navigation";
import { ProfileSetup } from "@/components/ProfileSetup";
import { profileSetupConfig } from "@/config/profileSetupConfig";

export default async function SetupPage({ params }) {
  const { role } = await params;
  const config = Object.hasOwn(profileSetupConfig, role) ? profileSetupConfig[role] : undefined;

  if (!config) notFound();

  return <ProfileSetup role={role} config={config} />;
}