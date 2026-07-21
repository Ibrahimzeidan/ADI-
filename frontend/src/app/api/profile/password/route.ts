import { handleChangePassword } from "@/controllers/profile.controller";

export async function POST(request: Request) {
  return handleChangePassword(request);
}