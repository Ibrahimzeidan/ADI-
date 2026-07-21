import { getAuthUser } from "@/middleware/auth.middleware";
import * as favoriteService from "@/services/favorite.service";
import { ok, err } from "@/utils/response";

export async function handleGetFavorites() {
  const user = await getAuthUser();
  if (!user) return err("Unauthorized", 401);
  const ids = await favoriteService.getFavoriteIds(user.id);
  return ok({ favoriteIds: Array.from(ids) });
}

export async function handleAddFavorite(request: Request) {
  const user = await getAuthUser();
  if (!user) return err("Unauthorized", 401);
  const { productId } = await request.json();
  await favoriteService.addFavorite(user.id, productId);
  return ok({ ok: true });
}

export async function handleRemoveFavorite(request: Request) {
  const user = await getAuthUser();
  if (!user) return err("Unauthorized", 401);
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId") ?? "";
  await favoriteService.removeFavorite(user.id, productId);
  return ok({ ok: true });
}
