/**
 * Unified Resilient API Client for ShowMySkills.
 * Automatically injects authorization tokens, supports configurable base URLs,
 * enforces fast failover timeouts, and provides fallback data when backend is not running.
 */

export const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
    }
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:5000/api";
    }
    return "https://showmyskills.xyphx.com/api";
  }
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "http://localhost:5000/api"
  );
};

/**
 * Standard API request with timeout and auto-injected Bearer auth.
 */
export async function apiRequest(endpoint, method = "GET", body = null, customHeaders = {}) {
  const baseUrl = getApiBaseUrl();
  const formattedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const headers = { ...customHeaders };

  // Auto-inject stored JWT token from localStorage if available
  if (typeof window !== "undefined") {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("jwt");
    if (token && !headers["Authorization"]) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const options = {
    method,
    headers,
  };

  if (body instanceof FormData) {
    options.body = body;
    // Do not set Content-Type for FormData; browser sets boundary
  } else if (body != null) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  // Abort request after 4 seconds to fail fast if backend is offline
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);
  options.signal = controller.signal;

  try {
    const res = await fetch(`${baseUrl}${formattedEndpoint}`, options);
    clearTimeout(timeoutId);

    if (!res.ok) {
      let errorData = {};
      try {
        errorData = await res.json();
      } catch {
        // Not a JSON response
      }
      const err = new Error(
        errorData.message || `Request failed with HTTP status ${res.status}`
      );
      err.status = res.status;
      err.data = errorData;
      throw err;
    }

    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Health check probe for system status and /error diagnostics.
 * Evaluates both Express API server availability and MongoDB database state.
 */
export async function checkBackendHealth() {
  const baseUrl = getApiBaseUrl();
  const startTime = Date.now();

  try {
    const res = await fetch(`${baseUrl}/health`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(5000),
    });

    const latencyMs = Date.now() - startTime;
    let payload = null;
    try {
      payload = await res.json();
    } catch {
      payload = null;
    }

    if (res.status === 200) {
      return {
        online: true,
        statusCode: 200,
        latencyMs,
        backend: payload?.services?.backend || { status: "up" },
        database: payload?.services?.database || { status: "connected" },
        message: payload?.message || "All core systems operational.",
        raw: payload,
      };
    } else if (res.status === 503) {
      return {
        online: true, // Express is responding, but service is degraded
        statusCode: 503,
        latencyMs,
        backend: payload?.services?.backend || { status: "up" },
        database: payload?.services?.database || {
          status: "disconnected",
          error: "MongoDB is not running or disconnected",
        },
        message:
          payload?.message || "Database service unavailable. MongoDB is not running.",
        raw: payload,
      };
    } else {
      return {
        online: true,
        statusCode: res.status,
        latencyMs,
        backend: payload?.services?.backend || { status: "unknown" },
        database: payload?.services?.database || { status: "unknown" },
        message: payload?.message || `HTTP ${res.status}`,
        raw: payload,
      };
    }
  } catch (err) {
    const latencyMs = Date.now() - startTime;
    return {
      online: false, // Express is NOT running or unreachable
      statusCode: 503,
      latencyMs,
      backend: {
        status: "offline",
        error: err.message || "Failed to connect to Express backend server.",
      },
      database: {
        status: "unknown",
        error: "Cannot check MongoDB status because backend server is not running.",
      },
      message: "Backend server is not running or unreachable at " + baseUrl,
      raw: { error: err.message },
    };
  }
}

/**
 * Executes a direct API request and unwraps the response data.
 * @param {string} endpoint - API route relative to /api
 * @param {string} method - HTTP method
 * @param {any} body - Request body
 * @param {Function} [transformFn] - Optional transformer function applied to real API data
 */
export async function apiFetch(
  endpoint,
  method = "GET",
  body = null,
  transformFn = null
) {
  const json = await apiRequest(endpoint, method, body);
  const data = json.data !== undefined ? json.data : json;
  if (transformFn && typeof transformFn === "function") {
    return transformFn(data);
  }
  return data;
}

/**
 * Standard API request unwrap with safe error handling (returns null/empty, never dummy data).
 */
export async function apiFetchWithFallback(
  endpoint,
  method = "GET",
  body = null,
  fallbackData = null,
  transformFn = null
) {
  try {
    const json = await apiRequest(endpoint, method, body);
    const data = json.data !== undefined ? json.data : json;
    if (transformFn && typeof transformFn === "function") {
      return transformFn(data);
    }
    return data;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[ShowMySkills API Error] ${method} ${endpoint}: ${err.message}`);
    }
    return fallbackData;
  }
}

// ─────────────────────────────────────────────────────────────
// DOMAIN-SPECIFIC DATABASE API SERVICES
// ─────────────────────────────────────────────────────────────

export const authService = {
  login: async (email, password, role) => {
    return apiRequest("/auth/login", "POST", { email, password, role });
  },

  register: async (userData) => {
    return apiRequest("/auth/register", "POST", userData);
  },

  getCurrentUser: async () => {
    return apiFetchWithFallback("/auth/me", "GET", null, null);
  },

  verifyEmail: async (email, otp) => {
    return apiRequest("/auth/verify-email", "POST", { email, otp });
  },

  forgotPassword: async (email) => {
    return apiRequest("/auth/forgot-password", "POST", { email });
  },

  resetPassword: async (email, otp, newPassword) => {
    return apiRequest("/auth/reset-password", "POST", { email, otp, newPassword });
  },
};

export const internshipService = {
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/internships?${queryString}` : "/internships";
    return apiFetchWithFallback(endpoint, "GET", null, []);
  },

  getById: async (id) => {
    return apiFetchWithFallback(`/internships/${id}`, "GET", null, null);
  },

  create: async (internshipData) => {
    return apiRequest("/internships", "POST", internshipData);
  },

  apply: async (internshipId, notes = "") => {
    return apiRequest("/applications/apply", "POST", { internshipId, notes });
  },

  toggleBookmark: async (internshipId) => {
    return apiRequest(`/bookmarks/internships/${internshipId}`, "POST");
  },
};

export const peopleService = {
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/users?${queryString}` : "/users";
    return apiFetchWithFallback(endpoint, "GET", null, []);
  },

  getById: async (id) => {
    return apiFetchWithFallback(`/users/${id}`, "GET", null, null);
  },
};

export const applicationService = {
  getMyApplications: async () => {
    return apiFetchWithFallback("/applications/my-applications", "GET", null, []);
  },

  getCompanyApplications: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString
      ? `/applications/company-applications?${queryString}`
      : "/applications/company-applications";
    return apiFetchWithFallback(endpoint, "GET", null, []);
  },

  updateStatus: async (applicationId, status, notes = "") => {
    return apiRequest(`/applications/${applicationId}/status`, "PUT", {
      status,
      notes,
    });
  },
};

export const chatService = {
  getConversations: async () => {
    return apiFetchWithFallback("/chats/conversations", "GET", null, []);
  },

  getMessages: async (conversationId) => {
    return apiFetchWithFallback(
      `/chats/conversations/${conversationId}/messages`,
      "GET",
      null,
      []
    );
  },

  sendMessage: async (text, receiverId, conversationId = null) => {
    return apiRequest("/chats/messages", "POST", {
      text,
      receiverId,
      conversationId,
    });
  },
};

export const launchpadService = {
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/launchpad?${queryString}` : "/launchpad";
    return apiFetchWithFallback(endpoint, "GET", null, []);
  },

  recordClick: async (id) => {
    return apiRequest(`/launchpad/${id}/click`, "POST");
  },
};

export const adminService = {
  getOverview: async () => {
    return apiFetchWithFallback("/admin/overview", "GET", null, null);
  },

  getUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/admin/users?${queryString}` : "/admin/users";
    return apiFetchWithFallback(endpoint, "GET", null, []);
  },

  updateRoleTag: async (userId, roleTag) => {
    return apiRequest(`/admin/users/${userId}/role-tag`, "PUT", { roleTag });
  },

  moderateInternship: async (internshipId, data) => {
    return apiRequest(`/admin/internships/${internshipId}/moderate`, "PUT", data);
  },

  getVerifications: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString
      ? `/admin/verifications?${queryString}`
      : "/admin/verifications";
    return apiFetchWithFallback(endpoint, "GET", null, []);
  },

  reviewVerification: async (verificationId, status, rejectionReason = "") => {
    return apiRequest(`/admin/verifications/${verificationId}`, "PUT", {
      status,
      rejectionReason,
    });
  },

  getAnalytics: async () => {
    return apiFetchWithFallback("/admin/analytics", "GET", null, null);
  },
};

export const notificationService = {
  list: async () => {
    return apiFetchWithFallback("/notifications", "GET", null, []);
  },

  markRead: async (notificationId = null) => {
    return apiRequest("/notifications/mark-read", "PUT", { notificationId });
  },
};

export const supportService = {
  getFaqs: async (search = "") => {
    const endpoint = search ? `/support/faqs?search=${encodeURIComponent(search)}` : "/support/faqs";
    return apiFetchWithFallback(endpoint, "GET", null, []);
  },

  submitTicket: async (ticketData) => {
    return apiRequest("/support/tickets", "POST", ticketData);
  },
};
