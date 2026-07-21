import { handleSignOut } from "@/controllers/auth.controller";

export async function POST() {
  return handleSignOut();
}