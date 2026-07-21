import {
  handleGetFavorites,
  handleAddFavorite,
  handleRemoveFavorite,
} from "@/controllers/favorite.controller";

export async function GET() {
  return handleGetFavorites();
}

export async function POST(request: Request) {
  return handleAddFavorite(request);
}

export async function DELETE(request: Request) {
  return handleRemoveFavorite(request);
}