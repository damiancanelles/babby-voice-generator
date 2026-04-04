"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LangProvider";

interface Props {
  onRecordingComplete: (file: File) => void;
  disabled?: boolean;
  recordingName?: string;
}

type RecordState = "idle" | "recording" | "preview";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function AudioRecorder({ onRecordingComplete, disabled, recordingName }: Props) {
  const [state, setState] = useState<RecordState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const { t } = useLang();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordedFileRef = useRef<File | null>(null);

  useEffect(() => {
    return () => {
      stopStream();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function stopStream() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  async function startRecording() {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg"]
        .find((m) => MediaRecorder.isTypeSupported(m)) ?? "";

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const type = recorder.mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type });
        const ext = type.includes("ogg") ? ".ogg" : ".webm";
        const baseName = (recordingName || "recording").trim().replace(/\s+/g, "_") || "recording";
        const file = new File([blob], `${baseName}${ext}`, { type });
        recordedFileRef.current = file;
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        setState("preview");
        stopStream();
      };

      recorder.start();
      setState("recording");
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      setMicError(t("rec_mic_error"));
    }
  }

  function stopRecording() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }

  function useRecording() {
    if (recordedFileRef.current) onRecordingComplete(recordedFileRef.current);
  }

  function reset() {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    recordedFileRef.current = null;
    setSeconds(0);
    setMicError(null);
    setState("idle");
  }

  // ── Idle ─────────────────────────────────────────────────────────────────────
  if (state === "idle") {
    return (
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={startRecording}
          disabled={disabled}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#EC4899",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 13,
            padding: "9px 22px",
            borderRadius: 100,
            border: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
            transition: "opacity 0.15s",
          }}
        >
          <MicIcon />
          {t("rec_start")}
        </button>
        {micError && (
          <p style={{ color: "#DC2626", fontSize: 12, textAlign: "center", maxWidth: 260 }}>{micError}</p>
        )}
      </div>
    );
  }

  // ── Recording ────────────────────────────────────────────────────────────────
  if (state === "recording") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <span style={{ color: "#1A0533", fontFamily: "monospace", fontSize: 14, letterSpacing: "0.1em" }}>
            {formatTime(seconds)}
          </span>
          <span style={{ color: "#9CA3AF", fontSize: 13 }}>{t("rec_recording")}</span>
        </div>
        <button
          onClick={stopRecording}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#EF4444",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 13,
            padding: "9px 20px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
          }}
        >
          <StopIcon />
          {t("rec_stop")}
        </button>
      </div>
    );
  }

  // ── Preview ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p style={{ color: "#9CA3AF", fontSize: 13 }}>
        {t("rec_ready")} · {formatTime(seconds)}
      </p>
      {audioUrl && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio src={audioUrl} controls className="w-full h-10 rounded-lg" />
      )}
      <div className="flex gap-3 w-full">
        <button
          onClick={useRecording}
          disabled={disabled}
          style={{
            flex: 1,
            background: "linear-gradient(90deg, #F472B6, #8B5CF6)",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 14,
            padding: "10px 0",
            borderRadius: 12,
            border: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {t("rec_use")}
        </button>
        <button
          onClick={reset}
          disabled={disabled}
          style={{
            padding: "10px 16px",
            background: "#F3EEFF",
            color: "#5B4E6D",
            fontWeight: 500,
            fontSize: 14,
            borderRadius: 12,
            border: "1.5px solid #D8B4FE",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {t("rec_redo")}
        </button>
      </div>
    </div>
  );
}

function MicIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
      <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
      <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
      <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
    </svg>
  );
}
