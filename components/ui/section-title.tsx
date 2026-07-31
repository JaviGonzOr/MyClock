type Props = {
  children: React.ReactNode;
};

export function SectionTitle({
  children,
}: Props) {
  return (
    <h2 className="text-lg font-bold text-slate-800">
      {children}
    </h2>
  );
}