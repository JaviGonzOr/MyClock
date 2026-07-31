type Props = {
  children: React.ReactNode;
};

export function PageContainer({
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-md flex-col gap-5 p-6">
        {children}
      </div>
    </main>
  );
}