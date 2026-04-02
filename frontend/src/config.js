/**
 * API base for axios.
 * - Development: defaults to "/api" so Create React App proxies to package.json "proxy" (local backend).
 * - Production: defaults to Render backend unless REACT_APP_API_URL is set.
 * Override anytime: REACT_APP_API_URL=http://localhost:5000
 */
const DEFAULT_REMOTE = "https://backend-48az.onrender.com";

/** Use CRA proxy in dev and Jest; production builds use remote unless REACT_APP_API_URL is set. */
const useLocalProxy = process.env.NODE_ENV !== "production";

export const API_BASE =
  process.env.REACT_APP_API_URL != null && process.env.REACT_APP_API_URL !== ""
    ? `${process.env.REACT_APP_API_URL.replace(/\/$/, "")}/api`
    : useLocalProxy
      ? "/api"
      : `${DEFAULT_REMOTE}/api`;
