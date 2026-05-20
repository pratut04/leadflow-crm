interface Props {
  status: string;
}

function StatusBadge({ status }: Props) {
  const statusStyles: Record<string, string> = {
    New: "bg-blue-500/20 text-blue-400",
    Contacted: "bg-yellow-500/20 text-yellow-400",
    Qualified: "bg-green-500/20 text-green-400",
    Lost: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;