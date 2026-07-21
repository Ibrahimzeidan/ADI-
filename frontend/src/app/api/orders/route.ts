import { handleGetOrders, handleCreateOrder } from "@/controllers/order.controller";

export async function GET() {
  return handleGetOrders();
}

export async function POST(request: Request) {
  return handleCreateOrder(request);
}