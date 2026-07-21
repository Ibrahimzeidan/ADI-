import { handleGetProfile, handleUpdateProfile } from "@/controllers/profile.controller";

export async function GET() {
  return handleGetProfile();
}

export async function PATCH(request: Request) {
  return handleUpdateProfile(request);
}