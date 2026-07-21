import { getAuthUser } from "@/middleware/auth.middleware";
import * as orderService from "@/services/order.service";
import { ok, err } from "@/utils/response";

export async function handleGetOrders() {
  const user = await getAuthUser();
  if (!user) return err("Unauthorized", 401);
  const orders = await orderService.getUserOrders(user.id);
  return ok(orders);
}

export async function handleCreateOrder(request: Request) {
  const user = await getAuthUser();
  if (!user) return err("Unauthorized", 401);
  try {
    const body = await request.json();
    const order = await orderService.createOrder(user.id, body);
    return ok(order);
  } catch (e: any) {
    return err(e.message, 500);
  }
}
