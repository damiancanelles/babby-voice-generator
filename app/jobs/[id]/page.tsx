"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { makeApi } from "@/lib/api";
import StatusBadge from "@/components/StatusBadge";

interface AudioFile {
  id: number;
  filename: string;
  type: string;
}

interface Job {
  id?: number;
  video_filename?: string;
  status: string;
  created_at?: string;
  error_message?: string;
  audio_files?: AudioFile[];
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const api = useMemo(() => makeApi(session?.backendToken), [session?.backendToken]);

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);

  const fetchJob = useCallback(() => {
    return api.getJob(id)
      .then(setJob)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Failed to load job"));
  }, [id, api]);

  useEffect(() => {
    if (!session?.backendToken) return;
    fetchJob().finally(() => setLoading(false));
  }, [fetchJob, session?.backendToken]);

  async function runPipeline() {
    setRunError(null);
    setRunning(true);
    try {
      await api.runPipeline(id);
      await fetchJob();
    } catch (e: unknown) {
      setRunError(e instanceof Error ? e.message : "Pipeline failed");
    } finally {
      setRunning(false);
    }
  }

  if (loading) return <p className="text-gray-400">Loading…</p>;
  if (error) return (
    <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg px-4 py-3 text-sm">{error}</div>
  );
  if (!job) return null;

  const audioFiles = job.audio_files ?? [];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {job.video_filename ?? "Job Detail"}
          </h1>
          <p className="text-gray-500 font-mono text-xs">{id}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>

      {/* Info card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 mb-1">Status</p>
          <StatusBadge status={job.status} />
        </div>
        <div>
          <p className="text-gray-500 mb-1">Created</p>
          <p className="text-gray-200">
            {job.created_at ? new Date(job.created_at).toLocaleString() : "—"}
          </p>
        </div>
      </div>

      {/* Pipeline error */}
      {job.error_message && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4">
          <p className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-1">Pipeline error</p>
          <pre className="text-red-300 text-xs whitespace-pre-wrap break-words font-mono">
            {job.error_message}
          </pre>
        </div>
      )}

      {/* Run pipeline */}
      <div className="flex flex-col gap-3">
        <button
          onClick={runPipeline}
          disabled={running}
          className="self-start bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          {running ? "Running pipeline…" : "▶ Run Pipeline"}
        </button>
        {runError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg px-4 py-3 text-sm">
            {runError}
          </div>
        )}
      </div>

      {/* Audio files */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Output Files</h2>
        {audioFiles.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No output files yet. Run the pipeline to generate audio.
          </p>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-left">
                  <th className="px-5 py-3 font-medium">File</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {audioFiles.map((f) => (
                  <tr key={f.id} className="border-b border-gray-800 last:border-0">
                    <td className="px-5 py-3 text-gray-200">{f.filename}</td>
                    <td className="px-5 py-3 text-gray-400">{f.type}</td>
                    <td className="px-5 py-3">
                      <a
                        href={api.audioDownloadUrl(String(f.id))}
                        download
                        className="text-indigo-400 hover:text-indigo-300 hover:underline"
                      >
                        Download ↓
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
