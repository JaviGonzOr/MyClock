type Props = {
  active: boolean;
};

export function StatusBadge({
  active,
}: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
        active
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full ${
          active
            ? "bg-green-600"
            : "bg-red-600"
        }`}
      />

      {active
        ? "Activo"
        : "Inactivo"}

    </span>
  );
}