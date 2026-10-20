import { redirect } from "next/navigation";

/**
 * /reset-password — friendly alias for the set-new-password page.
 * Nothing links here today, but users (and old reset emails) guess this
 * URL; send them to the real page instead of a 404.
 */
export default function ResetPasswordPage() {
  redirect("/update-password");
}
