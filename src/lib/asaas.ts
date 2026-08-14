// Integração com a API do Asaas (cobranças da loja).
// Docs: https://docs.asaas.com — sandbox e produção compartilham o mesmo contrato.

const ASAAS_BASE_URL =
  process.env.ASAAS_ENV === "production"
    ? "https://api.asaas.com/v3"
    : "https://api-sandbox.asaas.com/v3";

export function isAsaasConfigured() {
  return Boolean(process.env.ASAAS_API_KEY);
}

async function asaasFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const apiKey = process.env.ASAAS_API_KEY;
  if (!apiKey) {
    throw new Error("ASAAS_API_KEY não configurada no ambiente.");
  }

  const response = await fetch(`${ASAAS_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      access_token: apiKey,
      ...init?.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      (data as { errors?: { description?: string }[] })?.errors?.[0]?.description ||
      `Erro na API Asaas (${response.status}).`;
    throw new Error(message);
  }

  return data as T;
}

type AsaasCustomer = { id: string };

export type AsaasPayment = {
  id: string;
  status: string;
  invoiceUrl: string;
};

export async function findOrCreateAsaasCustomer(input: {
  name: string;
  email: string;
  cpfCnpj?: string;
  mobilePhone?: string;
}): Promise<AsaasCustomer> {
  // Busca por e-mail antes de criar para não duplicar clientes no Asaas.
  const existing = await asaasFetch<{ data?: AsaasCustomer[] }>(
    `/customers?email=${encodeURIComponent(input.email)}`,
  );

  if (existing.data?.length) {
    return existing.data[0];
  }

  return asaasFetch<AsaasCustomer>("/customers", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function createAsaasPayment(input: {
  customerId: string;
  value: number;
  description: string;
  externalReference: string;
}): Promise<AsaasPayment> {
  // Vencimento em 3 dias; billingType UNDEFINED deixa o cliente escolher
  // Pix, boleto ou cartão na própria fatura do Asaas.
  const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  return asaasFetch<AsaasPayment>("/payments", {
    method: "POST",
    body: JSON.stringify({
      customer: input.customerId,
      billingType: "UNDEFINED",
      value: Number(input.value.toFixed(2)),
      dueDate,
      description: input.description,
      externalReference: input.externalReference,
    }),
  });
}
