/**
 * Parse a currency string like "$29.99", "₹1,299.00", "USD 12.50"
 * into a number. Returns NaN if no numeric value is found.
 */
export function parsePrice(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned);
}

/** Generate a unique email for test isolation. */
export function uniqueEmail(prefix = 'test'): string {
  return `${prefix}.${Date.now()}@example.com`;
}

/** Simple async delay (avoid in real tests — prefer web-first assertions). */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
