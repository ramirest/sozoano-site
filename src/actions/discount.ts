"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { DiscountVoucher } from "@/models/DiscountVoucher";

const discountSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Use um e-mail válido."),
  phone: z.string().min(10, "Informe seu WhatsApp com DDD."),
  procedure: z.string().min(2, "Escolha o tratamento de interesse."),
  message: z.string().optional(),
});

export type DiscountState = {
  success: boolean;
  message: string;
  code?: string;
};

// Rate limit simples em memória para o formulário público de desconto.
const submissionLog = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (submissionLog.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    submissionLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissionLog.set(ip, recent);
  return false;
}

function generateVoucherCode() {
  return `SOZ-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function requestDiscount(
  _prevState: DiscountState,
  formData: FormData,
): Promise<DiscountState> {
  // Honeypot anti-bot.
  if (formData.get("website")) {
    return { success: true, message: "Recebemos seu pedido." };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return {
      success: false,
      message: "Recebemos vários pedidos seguidos. Aguarde alguns minutos e tente novamente.",
    };
  }

  const parsed = discountSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    procedure: formData.get("procedure"),
    message: formData.get("message") || undefined,
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Dados inválidos." };
  }

  try {
    await connectToDatabase();

    // Reaproveita voucher em aberto do mesmo e-mail para não gerar códigos duplicados.
    const existing = await DiscountVoucher.findOne({
      email: parsed.data.email,
      status: "issued",
    }).lean();

    if (existing) {
      return {
        success: true,
        message: "Você já tem um voucher ativo. Apresente este código ao agendar sua avaliação:",
        code: String(existing.code),
      };
    }

    const voucher = await DiscountVoucher.create({
      ...parsed.data,
      code: generateVoucherCode(),
      status: "issued",
    });

    return {
      success: true,
      message: "Voucher gerado com sucesso! Apresente este código ao agendar sua avaliação:",
      code: String(voucher.code),
    };
  } catch {
    return {
      success: false,
      message: "Não consegui gerar seu voucher agora. Tente novamente em instantes.",
    };
  }
}
