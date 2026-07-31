type Props = {
  label: string;
  value: string;
};

export function StatItem({
  label,
  value,
}: Props) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}