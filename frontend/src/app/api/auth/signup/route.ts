import { handleSignUp } from "@/controllers/auth.controller";

export async function POST(request: Request) {
  return handleSignUp(request);
}