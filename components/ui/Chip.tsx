interface ChipProps {
  label: string;
}

export default function Chip({ label }: ChipProps) {
  return <span className="chip">{label}</span>;
}
