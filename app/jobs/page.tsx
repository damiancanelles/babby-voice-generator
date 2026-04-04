"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { makeApi } from "@/lib/api";
import StatusBadge from "@/components/StatusBadge";
import { useLang } from "@/components/LangProvider";

interface Job {
  id: number;
  name?: string | null;
  video_filename?: string;
  status: string;
  created_at?: string;
}

export default function JobsPage() {
  const { data: session } = useSession();
  const api = useMemo(() => makeApi(session?.backendToken), [session?.backendToken]);
  const { t } = useLang();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.backendToken) return;
    api.listJobs()
      .then(setJobs)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : t("jobs_error")))
      .finally(() => setLoading(false));
  }, [session?.backendToken]);

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1A0533", lineHeight: 1.2 }}>
            {t("jobs_title")}
          </h1>
          <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>
            {t("jobs_subtitle")}
          </p>
        </div>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "linear-gradient(90deg, #F472B6, #8B5CF6)",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 14,
            padding: "10px 20px",
            borderRadius: 12,
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {t("jobs_new")}
        </Link>
      </div>

      {/* States */}
      {loading && (
        <p style={{ color: "#9CA3AF", fontSize: 14 }}>{t("jobs_loading")}</p>
      )}
      {error && (
        <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#DC2626", borderRadius: 12, padding: "12px 16px", fontSize: 14 }}>
          {error}
        </div>
      )}
      {!loading && !error && jobs.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#9CA3AF", fontSize: 14 }}>
          {t("jobs_empty")}{" "}
          <Link href="/" style={{ color: "#8B5CF6" }}>{t("jobs_empty_link")}</Link>
          {" "}{t("jobs_empty_suffix")}
        </div>
      )}

      {jobs.length > 0 && (
        <>
          {/* ── Desktop table (md+) ── */}
          <div
            className="hidden md:block overflow-hidden"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #EDE0FF",
              borderRadius: 16,
              boxShadow: "0 4px 20px #8B5CF618",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ backgroundColor: "#F8F4FF", borderBottom: "1px solid #F3EAFF" }}>
                  {[t("jobs_col_id"), t("jobs_col_name"), t("jobs_col_file"), t("jobs_col_status"), t("jobs_col_created"), ""].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#9CA3AF",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    style={{ borderBottom: "1px solid #F3EAFF" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAF7FF")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td style={{ padding: "16px 24px", fontWeight: 600, color: "#1A0533", fontVariantNumeric: "tabular-nums" }}>
                      #{job.id}
                    </td>
                    <td style={{ padding: "16px 24px", color: "#1A0533" }}>
                      {job.name ?? <span style={{ color: "#9CA3AF", fontStyle: "italic" }}>{t("jobs_unnamed")}</span>}
                    </td>
                    <td style={{ padding: "16px 24px", color: "#6B7280", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {job.video_filename ?? "—"}
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <StatusBadge status={job.status} />
                    </td>
                    <td style={{ padding: "16px 24px", color: "#6B7280" }}>
                      {job.created_at ? new Date(job.created_at).toLocaleString() : "—"}
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <Link
                        href={`/jobs/${job.id}`}
                        style={{ color: "#8B5CF6", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
                      >
                        {t("jobs_view")}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile cards (< md) ── */}
          <div className="flex flex-col gap-3 md:hidden">
            {jobs.map((job) => (
              <div
                key={job.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #EDE0FF",
                  borderRadius: 14,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: "#1A0533" }}>
                    {job.name ?? <span style={{ color: "#9CA3AF", fontStyle: "italic" }}>{t("jobs_unnamed")}</span>}
                  </span>
                  <StatusBadge status={job.status} />
                </div>
                <p style={{ fontSize: 12, color: "#9CA3AF" }}>
                  {job.video_filename ?? "—"}
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ flex: 1, fontSize: 12, color: "#9CA3AF" }}>
                    {job.created_at ? new Date(job.created_at).toLocaleString() : "—"}
                  </span>
                  <Link
                    href={`/jobs/${job.id}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "#8B5CF6", fontWeight: 600, fontSize: 13, textDecoration: "none" }}
                  >
                    {t("jobs_view")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
