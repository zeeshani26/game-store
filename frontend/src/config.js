const DEFAULT_REMOTE = "https://backend-48az.onrender.com";

const useLocalProxy = process.env.NODE_ENV !== "production";

export const API_BASE =
  process.env.REACT_APP_API_URL != null && process.env.REACT_APP_API_URL !== ""
    ? `${process.env.REACT_APP_API_URL.replace(/\/$/, "")}/api`
    : useLocalProxy
      ? "/api"
      : `${DEFAULT_REMOTE}/api`;
