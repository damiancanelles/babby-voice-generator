const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function authHeaders(token?: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Returns an API client pre-configured with the given auth token.
 * Call this inside components using the session token from useSession().
 *
 * Example:
 *   const { data: session } = useSession();
 *   const api = useMemo(() => makeApi(session?.backendToken), [session?.backendToken]);
 */
export function makeApi(token?: string | null) {
  return {
    base: API_URL,

    async uploadJob(file: File, name?: string) {
      const form = new FormData();
      form.append("file", file);
      if (name && name.trim()) form.append("name", name.trim());
      const res = await fetch(`${API_URL}/api/jobs/upload`, {
        method: "POST",
        headers: authHeaders(token),
        body: form,
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },

    async listJobs() {
      const res = await fetch(`${API_URL}/api/jobs/`, {
        headers: authHeaders(token),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },

    async getJob(id: string) {
      const res = await fetch(`${API_URL}/api/jobs/${id}`, {
        headers: authHeaders(token),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },

    async runPipeline(id: string) {
      const res = await fetch(`${API_URL}/api/jobs/${id}/run-pipeline`, {
        method: "POST",
        headers: authHeaders(token),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },

    /**
     * Returns a download URL for an audio file.
     * The JWT token is appended as a query param so the browser can follow
     * the <a href> link directly without a custom fetch call.
     */
    audioDownloadUrl(fileId: string) {
      const base = `${API_URL}/api/audio/${fileId}/download`;
      return token ? `${base}?token=${encodeURIComponent(token)}` : base;
    },
  };
}
