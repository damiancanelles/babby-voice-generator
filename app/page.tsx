"use client";

import { useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { makeApi } from "@/lib/api";
import AudioRecorder from "@/components/AudioRecorder";

const AUDIO_EXTENSIONS = new Set([".wav", ".mp3", ".m4a", ".aac", ".flac", ".ogg", ".wma"]);

function getFileKind(file: File): "audio" | "video" {
  if (file.type.startsWith("audio/")) return "audio";
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  return AUDIO_EXTENSIONS.has(ext) ? "audio" : "video";
}

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const api = useMemo(() => makeApi(session?.backendToken), [session?.backendToken]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileKind, setFileKind] = useState<"audio" | "video" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobName, setJobName] = useState("");

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    setFileKind(getFileKind(file));
    try {
      const job = await api.uploadJob(file, jobName || undefined);
      router.push(`/jobs/${job.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed");
      setUploading(false);
      setFileKind(null);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="flex flex-col items-center gap-6 py-4 md:gap-8 md:py-8">

      {/* ── Hero ── */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "linear-gradient(90deg, #FBCFE8, #DDD6FE)",
            color: "#7C3AED",
            fontSize: 12,
            fontWeight: 600,
            padding: "5px 16px",
            borderRadius: 100,
          }}
        >
          ✨ Gender Reveal Voice Generator
        </span>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 800,
            color: "#1A0533",
            lineHeight: 1.15,
          }}
        >
          Create Your Baby&apos;s Voice
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "#6B5B8A",
            maxWidth: 520,
            lineHeight: 1.6,
          }}
        >
          Upload a video or audio clip, or record directly — we&apos;ll transform it into a magical
          baby voice for your gender reveal moment.
        </p>
      </div>

      {/* ── Form area ── */}
      <div className="w-full max-w-3xl flex flex-col gap-5">

        {/* Recording name input */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="job-name"
            style={{ fontSize: 14, fontWeight: 600, color: "#5B4E6D" }}
          >
            Recording Name{" "}
            <span style={{ fontWeight: 400, color: "#9CA3AF" }}>(optional)</span>
          </label>
          <input
            id="job-name"
            type="text"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            disabled={uploading}
            placeholder="e.g. Baby Shower Recording"
            style={{
              width: "100%",
              backgroundColor: "#FAF8FF",
              border: "1.5px solid #D8B4FE",
              borderRadius: 12,
              padding: "11px 16px",
              fontSize: 14,
              color: "#1A0533",
              outline: "none",
              opacity: uploading ? 0.5 : 1,
            }}
            onFocus={(e) => (e.target.style.borderColor = "#8B5CF6")}
            onBlur={(e) => (e.target.style.borderColor = "#D8B4FE")}
          />
        </div>

        {/* Two-column: Upload | Record */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Upload card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => !uploading && inputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && !uploading && inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              minHeight: 260,
              borderRadius: 20,
              padding: 32,
              cursor: uploading ? "default" : "pointer",
              backgroundColor: dragging ? "#F5EDFF" : "#FDFAFF",
              border: `2px dashed ${dragging ? "#8B5CF6" : "#D8B4FE"}`,
              transition: "border-color 0.15s, background-color 0.15s",
              opacity: uploading && fileKind !== null ? 0.7 : 1,
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #F9A8D4, #C4B5FD)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {uploading && fileKind !== null ? (
                <span style={{ fontSize: 28 }}>⏳</span>
              ) : (
                <UploadIcon />
              )}
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 600, fontSize: 15, color: "#1A0533" }}>
                {uploading && fileKind !== null ? "Uploading…" : "Drop your video or audio here"}
              </p>
              {!(uploading && fileKind !== null) && (
                <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>
                  Supports MP4, MOV, MP3, WAV, M4A, AAC, FLAC
                </p>
              )}
            </div>

            {!(uploading && fileKind !== null) && (
              <span
                style={{
                  display: "inline-block",
                  background: "linear-gradient(90deg, #F472B6, #8B5CF6)",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "10px 22px",
                  borderRadius: 12,
                  pointerEvents: "none",
                }}
              >
                Browse Files
              </span>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="video/*,audio/*,.wav,.mp3,.m4a,.aac,.flac,.ogg,.wma"
              className="hidden"
              onChange={onInputChange}
            />
          </div>

          {/* Record card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              minHeight: 260,
              borderRadius: 20,
              padding: 32,
              backgroundColor: "#FFF5FB",
              border: "1.5px solid #F9A8D4",
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FB7185, #F472B6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <MicIconLg />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 600, fontSize: 15, color: "#1A0533" }}>Record Audio</p>
              <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>
                Capture your voice directly from the browser
              </p>
            </div>
            <AudioRecorder
              disabled={uploading}
              recordingName={jobName || "recording"}
              onRecordingComplete={handleFile}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              backgroundColor: "#FEE2E2",
              border: "1px solid #FCA5A5",
              color: "#DC2626",
              borderRadius: 12,
              padding: "12px 16px",
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width={28} height={28}>
      <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
    </svg>
  );
}

function MicIconLg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width={28} height={28}>
      <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
      <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
    </svg>
  );
}
