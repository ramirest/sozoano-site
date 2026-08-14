import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { Testimonial } from "@/models/Testimonial";
import { UserStory } from "@/models/UserStory";

export const dynamic = "force-dynamic";

async function getCounts() {
  await connectToDatabase();

  const [pendingStories, testimonials, products, pendingOrders, paidOrders] = await Promise.all([
    UserStory.countDocuments({ approved: false }),
    Testimonial.countDocuments({}),
    Product.countDocuments({}),
    Order.countDocuments({ status: "pending" }),
    Order.countDocuments({ status: "paid" }),
  ]);

  return { pendingStories, testimonials, products, pendingOrders, paidOrders };
}

export default async function AdminDashboardPage() {
  let counts: Awaited<ReturnType<typeof getCounts>> | null = null;

  try {
    counts = await getCounts();
  } catch {
    counts = null;
  }

  if (!counts) {
    return (
      <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 p-6 text-sm">
        Não consegui conectar ao banco de dados. Verifique a variável MONGODB_URI no ambiente.
      </div>
    );
  }

  const cards = [
    {
      href: "/admin/historias",
      label: "Histórias aguardando moderação",
      value: counts.pendingStories,
    },
    { href: "/admin/depoimentos", label: "Depoimentos cadastrados", value: counts.testimonials },
    { href: "/admin/produtos", label: "Produtos na loja", value: counts.products },
    { href: "/admin/pedidos", label: "Pedidos aguardando pagamento", value: counts.pendingOrders },
    { href: "/admin/pedidos", label: "Pedidos pagos", value: counts.paidOrders },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.label}
          href={card.href}
          className="rounded-2xl border border-primary/20 bg-secondary/30 p-6 transition hover:border-primary/60"
        >
          <p className="font-heading text-5xl text-primary">{card.value}</p>
          <p className="mt-2 text-sm text-foreground/75">{card.label}</p>
        </Link>
      ))}
    </div>
  );
}
