import { handleUploadPhoto } from "@/controllers/profile.controller";

export async function POST(request: Request) {
  return handleUploadPhoto(request);
}