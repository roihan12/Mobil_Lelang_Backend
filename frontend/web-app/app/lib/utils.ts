export const showNotification = (
  message: string,
  type: "success" | "error" | "info" = "success"
) => {
  // Simple notification helper
  console.log(`[${type.toUpperCase()}] ${message}`);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatMileage = (mileage: number): string => {
  return new Intl.NumberFormat("en-US").format(mileage);
};

export const capitalizeCondition = (condition: string): string => {
  return condition.charAt(0).toUpperCase() + condition.slice(1);
};
