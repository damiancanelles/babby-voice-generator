const styles: Record<string, { bg: string; color: string }> = {
  pending:    { bg: "#FEF9C3", color: "#CA8A04" },
  processing: { bg: "#DBEAFE", color: "#2563EB" },
  completed:  { bg: "#DCFCE7", color: "#16A34A" },
  failed:     { bg: "#FEE2E2", color: "#DC2626" },
};

export default function StatusBadge({ status }: { status: string }) {
  const s = styles[status?.toLowerCase()] ?? { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        backgroundColor: s.bg,
        color: s.color,
        fontSize: 12,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 100,
        whiteSpace: "nowrap",
      }}
    >
      <span>●</span>
      {status}
    </span>
  );
}
