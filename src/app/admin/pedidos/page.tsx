import { updateOrderStatus } from "@/actions/admin";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pending: { label: "Aguardando pagamento", className: "bg-amber-500/15 text-amber-300" },
  paid: { label: "Pago", className: "bg-emerald-500/15 text-emerald-300" },
  overdue: { label: "Vencido", className: "bg-orange-500/15 text-orange-300" },
  canceled: { label: "Cancelado", className: "bg-rose-500/15 text-rose-300" },
  refunded: { label: "Reembolsado", className: "bg-sky-500/15 text-sky-300" },
};

const actionButton =
  "rounded-lg border border-primary/30 px-3 py-1.5 text-xs transition hover:border-primary/70 hover:text-primary";

export default async function AdminOrdersPage() {
  await connectToDatabase();
  const orders = await Order.find({}).sort({ createdAt: -1 }).limit(200).lean();

  if (!orders.length) {
    return (
      <p className="rounded-2xl border border-primary/20 bg-secondary/30 p-6 text-sm text-foreground/75">
        Nenhum pedido registrado ainda. Assim que o checkout Asaas estiver ativo, os pedidos
        aparecerão aqui automaticamente.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {orders.map((order) => {
        const id = String(order._id);
        const status = STATUS_LABELS[String(order.status)] ?? STATUS_LABELS.pending;
        const items = (order.items || []) as Array<Record<string, unknown>>;

        return (
          <article key={id} className="rounded-2xl border border-primary/20 bg-secondary/30 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium text-primary">{String(order.customer?.name)}</p>
                <p className="text-sm text-foreground/70">
                  {String(order.customer?.email)} ·{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : ""}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs ${status.className}`}>
                {status.label}
              </span>
            </div>

            <ul className="mt-3 space-y-1 text-sm text-foreground/85">
              {items.map((item, index) => (
                <li key={index}>
                  {String(item.quantity)}x {String(item.title)}
                  {item.size ? ` · Tam ${String(item.size)}` : ""}
                  {item.color ? ` · ${String(item.color)}` : ""} — R${" "}
                  {Number(item.price).toFixed(2).replace(".", ",")}
                </li>
              ))}
            </ul>

            <p className="mt-2 font-medium text-primary">
              Total: R$ {Number(order.total).toFixed(2).replace(".", ",")}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {order.asaasInvoiceUrl ? (
                <a
                  href={String(order.asaasInvoiceUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className={actionButton}
                >
                  Ver fatura Asaas
                </a>
              ) : null}
              {order.status !== "paid" ? (
                <form action={updateOrderStatus.bind(null, id, "paid")}>
                  <button type="submit" className={actionButton}>
                    Marcar como pago
                  </button>
                </form>
              ) : null}
              {order.status !== "canceled" ? (
                <form action={updateOrderStatus.bind(null, id, "canceled")}>
                  <button
                    type="submit"
                    className="rounded-lg border border-rose-400/40 px-3 py-1.5 text-xs text-rose-300 transition hover:border-rose-400"
                  >
                    Cancelar pedido
                  </button>
                </form>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
