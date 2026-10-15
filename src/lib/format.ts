const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const fmtWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function money(amount: number): string {
  return Number.isInteger(amount)
    ? fmtWhole.format(amount)
    : fmt.format(amount);
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
