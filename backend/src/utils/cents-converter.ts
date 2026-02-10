export const convertToCents = (amount: number) =>
  Math.round(Number(amount) * 100)
export const convertFromCents = (cents: number) => (cents / 100).toFixed(2)
