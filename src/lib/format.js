const inr = new Intl.NumberFormat("en-IN");

export function rupees(amount) {
  return `₹${inr.format(amount)}`;
}
