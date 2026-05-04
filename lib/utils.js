// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateImageURL = (url) => {
  if (!url) return true; // Image URL is optional
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Error message formatting
export const getErrorMessage = (error) => {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (error.message) return error.message;
  return "An error occurred. Please try again.";
};

// Format currency
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

// Format rating
export const formatRating = (rating) => {
  return Number(rating).toFixed(1);
};

// Redirect with authentication check
export const redirectToLogin = (router, currentPath) => {
  const redirectPath = encodeURIComponent(currentPath);
  router.push(`/login?redirect=${redirectPath}`);
};

// Handle async operations with loading and error states
export const handleAsyncOperation = async (asyncFunc, callbacks = {}) => {
  try {
    callbacks.onLoading?.();
    const result = await asyncFunc();
    callbacks.onSuccess?.(result);
    return result;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    callbacks.onError?.(errorMessage);
    throw error;
  } finally {
    callbacks.onFinally?.();
  }
};

// Debounce function for search and input
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Get initials from name for avatar
export const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
