type Props = {
  today: string;
  week: string;
  month: string;
  overtime: string;
};

export function HistoryStats({
  today,
  week,
  month,
  overtime,
}: Props) {
  const items = [
    {
      title: "Hoy",
      value: today,
    },
    {
      title: "Semana",
      value: week,
    },
    {
      title: "Mes",
      value: month,
    },
    {
      title: "Extra",
      value: overtime,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl border bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {item.title}
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}