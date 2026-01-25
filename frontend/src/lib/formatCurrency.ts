export const formatCurrency = (cents: number, currency = "ZAR") => {
 return new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency,
 }).format(cents / 100);
};

export const toCents = (amount: number) => Math.round(Number(amount) * 100);
export const fromCents = (cents: number) => (cents / 100)