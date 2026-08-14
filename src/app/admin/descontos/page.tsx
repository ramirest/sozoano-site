import { deleteVoucher, markVoucherUsed } from "@/actions/admin";
import { connectToDatabase } from "@/lib/mongodb";
import { DiscountVoucher } from "@/models/DiscountVoucher";

export const dynamic = "force-dynamic";

const actionButton =
  "rounded-lg border border-primary/30 px-3 py-1.5 text-xs transition hover:border-primary/70 hover:text-primary";

export default async function AdminVouchersPage() {
  await connectToDatabase();
  const vouchers = await DiscountVoucher.find({}).sort({ createdAt: -1 }).limit(200).lean();

  if (!vouchers.length) {
    return (
      <p className="rounded-2xl border border-primary/20 bg-secondary/30 p-6 text-sm text-foreground/75">
        Nenhum voucher de desconto solicitado ainda.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {vouchers.map((voucher) => {
        const id = String(voucher._id);

        return (
          <article key={id} className="rounded-2xl border border-primary/20 bg-secondary/30 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-heading text-2xl tracking-wider text-primary">
                  {String(voucher.code)}
                </p>
                <p className="text-sm text-foreground/70">
                  {String(voucher.name)} · {String(voucher.email)}
                  {voucher.phone ? ` · ${String(voucher.phone)}` : ""}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  voucher.status === "used"
                    ? "bg-sky-500/15 text-sky-300"
                    : "bg-emerald-500/15 text-emerald-300"
                }`}
              >
                {voucher.status === "used" ? "Utilizado" : "Ativo"}
              </span>
            </div>

            <p className="mt-3 text-sm text-foreground/85">
              <strong className="text-accent">Tratamento:</strong> {String(voucher.procedure)}
            </p>
            {voucher.message ? (
              <p className="mt-1 text-sm text-foreground/75">
                <strong className="text-accent">Relato:</strong> {String(voucher.message)}
              </p>
            ) : null}
            <p className="mt-1 text-xs text-foreground/60">
              Solicitado em{" "}
              {voucher.createdAt ? new Date(voucher.createdAt).toLocaleString("pt-BR") : "—"}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {voucher.status !== "used" ? (
                <form action={markVoucherUsed.bind(null, id)}>
                  <button type="submit" className={actionButton}>
                    Marcar como utilizado
                  </button>
                </form>
              ) : null}
              <form action={deleteVoucher.bind(null, id)}>
                <button
                  type="submit"
                  className="rounded-lg border border-rose-400/40 px-3 py-1.5 text-xs text-rose-300 transition hover:border-rose-400"
                >
                  Excluir
                </button>
              </form>
            </div>
          </article>
        );
      })}
    </div>
  );
}
