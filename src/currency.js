export const INR_PER_USD = 83;
export const FREE_SHIPPING_THRESHOLD = 65 * INR_PER_USD;
export const STANDARD_SHIPPING_FEE = 5 * INR_PER_USD;

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
