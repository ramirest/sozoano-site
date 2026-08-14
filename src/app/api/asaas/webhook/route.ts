import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

export const runtime = "nodejs";

// Mapeia eventos de pagamento do Asaas para o status interno do pedido.
const STATUS_BY_EVENT: Record<string, string> = {
  PAYMENT_CONFIRMED: "paid",
  PAYMENT_RECEIVED: "paid",
  PAYMENT_OVERDUE: "overdue",
  PAYMENT_DELETED: "canceled",
  PAYMENT_REFUNDED: "refunded",
};

export async function POST(request: Request) {
  const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;

  // O Asaas envia o token configurado no cabeçalho asaas-access-token.
  if (!expectedToken || request.headers.get("asaas-access-token") !== expectedToken) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const event = await request.json().catch(() => null);
  const status = STATUS_BY_EVENT[event?.event as string];
  const paymentId = event?.payment?.id as string | undefined;
  const externalReference = event?.payment?.externalReference as string | undefined;

  if (!status || !paymentId) {
    // Evento que não acompanhamos: confirma o recebimento para o Asaas não reenviar.
    return NextResponse.json({ received: true });
  }

  await connectToDatabase();
  await Order.findOneAndUpdate(
    externalReference ? { _id: externalReference } : { asaasPaymentId: paymentId },
    { status },
  );

  return NextResponse.json({ received: true });
}
